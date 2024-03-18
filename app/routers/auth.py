from datetime import timedelta
from typing import Any

from fastapi import APIRouter, HTTPException, Depends, status, Header
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext

from app.classes.Auth import SimpleAuthForm
from app.components.auth.jwt_token_handler import create_jwt_access_token
from app.components.logger import logger
from app.db.mongoClient import async_database
from app.db.redisClient import RedisClient

router = APIRouter()

user_collection = async_database.users  # Get the collection from the database
redisClient = RedisClient.get_instance()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")  # setup password hashing context
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")  # Dependency


async def authenticate_user(username: str, password: str):
    """
    Authenticate the user by connecting to MongoDB asynchronously and checking the password.
    :param username:
    :param password:
    :return:
    """
    user = await user_collection.find_one({"username": username})  # Use `await` for async operation
    if not user:
        return False
    if not pwd_context.verify(password, user.get("hashed_password")):  # Verify the password
        return False
    return user


@router.post("/token")
async def login_for_access_token(form_data: SimpleAuthForm = Depends()):
    """
    Log-in and generate access token
    :param form_data:
    :return:
    """
    try:
        user: dict | Any = await authenticate_user(form_data.username, form_data.password)
        if not user:
            logger.warning(f"Login attempt failed for user: {form_data.username}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token_expires = timedelta(minutes=30)  # Token validity can be adjusted
        access_token = create_jwt_access_token(
            data={"sub": user["username"]}, expires_delta=access_token_expires
        )
        logger.info(f"Login successful for user: {form_data.username}")
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        logger.error(f"An error occurred during login attempt: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during the login process."
        )


@router.post("/logout")
async def logout(api_key: str = Header(...)):
    """
    Invalidate the user's current JWT token to log them out.
    """
    try:
        token_key = f"API_KEY_{api_key}"
        token_exists = redisClient.exists(token_key)
        if not token_exists:
            raise HTTPException(status_code=404, detail="Token not found or already invalidated")

        # Invalidate the token by deleting it from Redis
        redisClient.delete(token_key)
        return {"message": "Logged out successfully."}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}"
        )
