from typing import List

from bson import ObjectId
from fastapi import APIRouter, HTTPException, Depends
from starlette import status

from app.classes.User import UserCreate, User, UpdateUser
from app.components.auth.check_permissions import check_permissions
from app.components.auth.jwt_token_handler import get_jwt_username
from app.components.hash_password import hash_password
from app.components.logger import logger
from app.db.mongoClient import async_database

router = APIRouter()  # router instance

user_collection = async_database.users  # Get the collection from the database


@router.get("/users/", response_model=List[User], dependencies=[Depends(check_permissions)])
async def get_users(username: str = Depends(get_jwt_username)):
    try:
        users = []
        async for user in user_collection.find({}):
            users.append(User.from_mongo(user))
        logger.info(f"User list requested by {username} - Success")
        return users
    except Exception as e:
        logger.error(f"User list requested by {username} - Failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while fetching users."
        )

@router.get("/users/profile", response_model=User, dependencies=[Depends(check_permissions)])
async def get_profile(current_username: str = Depends(get_jwt_username)):
    try:
        # Find the current user based on the username obtained from the JWT token
        user = await user_collection.find_one({"username": current_username})
        if not user:
            logger.warning(f"Profile not found for {current_username}")
            raise HTTPException(status_code=404, detail="Profile not found")
        user["_id"] = str(user["_id"])
        logger.info(f"Profile fetched for user {current_username} successfully.")
        return user
    except Exception as e:
        logger.error(f"Error fetching profile for {current_username}: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching the profile.")


@router.get("/users/{id}", response_model=User, dependencies=[Depends(check_permissions)])
async def get_user(id: str, username: str = Depends(get_jwt_username)):
    try:
        user = await user_collection.find_one({"_id": ObjectId(id)})
        if not user:
            logger.warning(f"User with ID {id} not found by {username}")
            raise HTTPException(status_code=404, detail="User with ID {id} not found")
        user["_id"] = str(user["_id"])
        logger.info(f"User {username} fetched user {id} successfully.")
        return user
    except Exception as e:
        logger.error(f"Error fetching user by {username}: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching the user.")


@router.post("/users/", response_model=User, dependencies=[Depends(check_permissions)])
async def create_user(user: UserCreate, username: str = Depends(get_jwt_username)):
    try:
        if await user_collection.find_one({"email": user.email}) or await user_collection.find_one(
                {"username": user.username}):
            detail_msg = "The email is already in use." if await user_collection.find_one(
                {"email": user.email}) else "The username is already in use."
            logger.warning(f"Attempt to use an existing email or username by {username}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=detail_msg
            )

        hashed_password = hash_password(user.password)
        user_dict = user.dict()
        user_dict["hashed_password"] = hashed_password
        del user_dict["password"]

        new_user = await user_collection.insert_one(user_dict)
        created_user = await user_collection.find_one({"_id": new_user.inserted_id})
        created_user['_id'] = str(created_user['_id'])
        del created_user["hashed_password"]

        logger.info(f"User {username} created new user {user.username} successfully.")
        return created_user
    except Exception as e:
        logger.error(f"Error creating user by {username}: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while creating the user.")


@router.put("/users/{id}", dependencies=[Depends(check_permissions)])
async def update_user(id: str, update_data: UpdateUser, username: str = Depends(get_jwt_username)):
    try:
        update_data_dict = update_data.dict(exclude_unset=True)
        if "password" in update_data_dict:
            update_data_dict["hashed_password"] = hash_password(update_data_dict.pop("password"))

        updated_user = await user_collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": update_data_dict},
            return_document=True
        )
        if not updated_user:
            logger.warning(f"User with ID {id} not found by {username}")
            raise HTTPException(status_code=404, detail="User with ID {id} not found")

        updated_user['_id'] = str(updated_user['_id'])
        del updated_user["hashed_password"]

        logger.info(f"User {username} updated user {id} successfully.")
        return updated_user
    except Exception as e:
        logger.error(f"Error updating user by {username}: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while updating the user.")


@router.delete("/users/{id}", dependencies=[Depends(check_permissions)])
async def delete_user(id: str, username: str = Depends(get_jwt_username)):
    try:
        delete_result = await user_collection.delete_one({"_id": ObjectId(id)})

        if delete_result.deleted_count == 0:
            logger.warning(f"Attempt to delete non-existing user with ID {id} by {username}")
            raise HTTPException(status_code=404, detail="User with ID {id} not found")

        logger.info(f"User {username} deleted user {id} successfully.")
        return {"message": "User deleted successfully."}  # Now it will return a 200 status code with this message
    except Exception as e:
        logger.error(f"Error deleting user by {username}: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while deleting the user.")
