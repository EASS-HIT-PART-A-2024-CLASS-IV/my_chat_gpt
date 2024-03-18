import os
import secrets
from datetime import datetime, timedelta

from dotenv import load_dotenv
from fastapi import HTTPException, Depends, security, status
from fastapi.security import HTTPBasicCredentials, HTTPBasic

from app.db.redisClient import RedisClient

redisClient = RedisClient.get_instance()

# Load environment variables from .env file
load_dotenv()
SECRET_KEY = os.environ["static_bearer_secret_key"]  # loading bearer_secret_key from.env file

# Create an instance of HTTPBearer
http_bearer = security.HTTPBearer()
security_basic = HTTPBasic()


def get_secret_key(security_payload: security.HTTPAuthorizationCredentials = Depends(http_bearer)):
    """
    This function is used to get the secret key from the authorization header.
    :param security_payload:
    :return:
    """
    authorization = security_payload.credentials
    if not authorization or SECRET_KEY not in authorization:
        raise HTTPException(status_code=403, detail="Unauthorized")
    return authorization


def get_login_attempts(username: str):
    """
    This function is used to get the number of failed login attempts.
    :param username:
    :return:
    """
    attempts = redisClient.get(f"{username}:attempts")
    if attempts:
        return int(attempts)
    return 0


def get_last_attempt_time(username: str):
    """
    This function is used to get the last login attempt time.
    :param username:
    :return:
    """
    last_time = redisClient.get(f"{username}:last_attempt")
    if last_time:
        return datetime.fromtimestamp(float(last_time))
    return None


def set_failed_login(username: str, attempts: int, last_attempt_time: datetime):
    """
    This function is used to set the number of failed login attempts and the last login attempt time.
    :param username:
    :param attempts:
    :param last_attempt_time:
    :return:
    """
    redisClient.set(f"{username}:attempts", attempts, ex=300)  # 5 minutes expiration
    redisClient.set(f"{username}:last_attempt", last_attempt_time.timestamp(), ex=300)  # 5 minutes expiration


def reset_login_attempts(username: str):
    """
    This function is used to reset the number of failed login attempts and the last login attempt time.
    :param username:
    :return:
    """
    redisClient.delete(f"{username}:attempts", f"{username}:last_attempt")


def verify_credentials(credentials: HTTPBasicCredentials = Depends(security_basic)):
    """
    This function is used to verify the credentials.
    :param credentials:
    :return:
    """
    username = credentials.username
    current_time = datetime.now()

    # Check if the username is currently blocked
    attempts = get_login_attempts(username)
    last_attempt_time = get_last_attempt_time(username)

    if attempts >= 5 and last_attempt_time and (current_time - last_attempt_time) < timedelta(minutes=5):
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                            detail="Too many login attempts. Please try again later.")

    correct_username = secrets.compare_digest(credentials.username, os.environ["fastapi_ui_username"])
    correct_password = secrets.compare_digest(credentials.password, os.environ["fastapi_ui_password"])

    if not (correct_username and correct_password):
        set_failed_login(username, attempts + 1, current_time)
        raise HTTPException(status_code=401, detail="Incorrect username or password")

    # Reset the count on successful login
    reset_login_attempts(username)

    return credentials
