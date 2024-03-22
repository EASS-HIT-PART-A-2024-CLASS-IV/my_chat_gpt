import os

from dotenv import load_dotenv

from app.classes.User import UserCreate
from app.components.logger import logger
from app.db.mongoClient import async_database
from app.routers.users import create_user

load_dotenv()  # loading environment variables


async def check_key_not_expired(redis_client, key):
    """
    Check if a given key exists and thus has not expired.
    """
    # Attempt to get the value for the specified key
    value = redis_client.get(key)

    # If the value exists, the key has not expired
    if value is not None:
        return True
    else:
        return False


async def create_owner():
    owner_email = os.getenv("owner_email")
    user_collection = async_database.users  # Get the collection from the database

    if await user_collection.find_one({"email": owner_email}):
        logger.info("Owner already exists, skipping creation.")
        return

    admin_user = {
        "username": os.getenv("owner_username"),
        "email": os.getenv("owner_email"),
        "full_name": "Site Owner",
        "disabled": False,
        "password": os.getenv("owner_password"),
        "role": "owner"
    }
    # Directly call the logic to create a user
    await create_user(UserCreate(**admin_user), "system_init")


async def initialize_message_settings():
    settings_collection = async_database.settings  # Assuming a collection named 'settings'

    # Check if settings already exist to avoid duplication
    existing_settings = await settings_collection.find_one({"_id": "65fdaaca4f94194ff730d3be"})
    if existing_settings:
        logger.info("Message settings already initialized, skipping.")
        return

    # Define the initial settings document
    initial_settings = {
        "_id": "65fdaaca4f94194ff730d3be",
        # You might want to use a different ID system or let MongoDB generate it, it doesn't matter just make sure your endpoints has the same settings.
        "smtp": {
            "active": False,
            "server": "smtp.gmail.com",
            "port": 587,
            "user": "youremail@gmail.com",
            "password": "your_password",
            "system_email": "your_system_email"
        },
        "whatsapp": {
            "active": False,
            "account_sid": "your_account_sid",
            "auth_token": "your_auth_token",
            "from_number": "+1234567890"
        },
        "sms": {
            "active": False,
            "provider": "Twilio",
            "api_key": "your_api_key",
            "from_number": "+1234567890"
        }
    }

    # Insert the initial settings document into the database
    await settings_collection.insert_one(initial_settings)
    logger.info("Initial settings have been successfully set up.")
