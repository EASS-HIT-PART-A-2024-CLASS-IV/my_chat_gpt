import secrets
from datetime import timedelta

from fastapi import status, Request, HTTPException, APIRouter

from app.classes.User import User, Role, UserRegistration
from app.components.hash_password import hash_password
from app.components.logger import logger
from app.components.message_dispatcher.mail import send_email_and_save
from app.db.mongoClient import async_database
from app.routers.users import user_exists

router = APIRouter()  # router instance
user_collection = async_database.users  # Get the collection from the database


@router.post("/register/", response_model=User)
async def create_user(user_registration: UserRegistration):
    """
    User registration endpoint.
    This function handles the registration of a new user.
    It checks for uniqueness of the email and username, hashes the password, and inserts a new user into the database.
    """

    try:
        # Check if the user with the given email or username already exists.
        if await user_exists(email=user_registration.email, username=user_registration.username):
            detail_msg = "The email or username is already in use."
            logger.warning(
                f"Attempt to create a user with an existing email or username by {user_registration.username}")
            # If the user exists, raise an HTTP exception with a 400 status code.
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=detail_msg
            )

        # Hash the plaintext password provided in the registration.
        hashed_password = hash_password(user_registration.password)

        # Prepare the user document for insertion into the database.
        # This includes removing the plaintext password and adding hashed_password, role, and disabled status.
        user_dict = user_registration.dict()
        user_dict["hashed_password"] = hashed_password
        del user_dict["password"]  # Remove plaintext password from the document
        user_dict["role"] = Role.user.value  # Explicitly set the user's role to 'user'
        user_dict["disabled"] = False  # New users are not disabled by default

        # Insert the new user document into the database collection.
        new_user = await user_collection.insert_one(user_dict)

        # Retrieve the newly created user document from the database to return it.
        created_user = await user_collection.find_one({"_id": new_user.inserted_id})
        created_user['_id'] = str(created_user['_id'])  # Convert ObjectId to string for JSON serialization
        del created_user["hashed_password"]  # Remove hashed password from the returned user document

        logger.info(f"Registered new user {user_registration.username} successfully.")

        # Return the created user, converting the MongoDB document to the User model.
        return User.from_mongo(created_user)
    except Exception as e:
        logger.error(f"Error registering new user {user_registration.username}: {str(e)}")
        # Raise a 500 status code HTTP exception if an unexpected error occurs during registration.
        raise HTTPException(status_code=500, detail="An error occurred while creating the user.")


@router.post("/users/forgot-password/")
async def forgot_password(email: str, request: Request):
    user = await user_collection.find_one({"email": email})
    redis_client = request.app.state.redis
    if not user:
        raise HTTPException(status_code=404, detail="User with this email does not exist.")

    # Generate a secure, random token for the password reset
    reset_token = secrets.token_urlsafe(32)
    # reset_token_expires = int((datetime.utcnow() + timedelta(hours=1)).timestamp())

    # Use Redis to store the token with an expiration time
    await redis_client.setex(f"reset_token:{reset_token}", timedelta(hours=1), value=str(user["_id"]))

    # Email the user with the reset token
    reset_link = f"https://yourfrontend.com/reset-password?token={reset_token}"
    await send_email_and_save(
        subject="Password Reset Request",
        body=f"Please click on the link to reset your password: {reset_link}",
        to_emails=[email],
        files=[]
    )
    return {"message": "If an account with this email was found, a password reset link has been sent."}


@router.post("/users/reset-password/")
async def reset_password(token: str, new_password: str, request: Request):
    redis_client = request.app.state.redis
    user_id = await redis_client.get(f"reset_token:{token}")
    if not user_id:
        raise HTTPException(status_code=400, detail="Invalid or expired password reset token.")

    # Hash the new password
    hashed_password = hash_password(new_password)

    # Update the user's password
    await user_collection.update_one(
        {"_id": user_id},
        {"$set": {"hashed_password": hashed_password}}
    )

    # Optionally, delete the token from Redis after use
    await redis_client.delete(f"reset_token:{token}")

    return {"message": "Password has been reset successfully."}
