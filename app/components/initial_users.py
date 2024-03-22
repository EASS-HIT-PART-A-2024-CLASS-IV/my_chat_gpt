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

# # An Redis Lock Example for Future Implementations When Running Multiple Workers
# async def create_initial_users(redis_client):
#     lock_key = "lock_users_creation"  # Unique key for locking
#     expiry_seconds = 120  # Lock expiration time
#
#     try:
#         lock_acquired = await redis_client.set(lock_key, "1", ex=expiry_seconds, nx=True)
#         if lock_acquired:
#             try:
#                 await create_owner()
#             except Exception as e:
#                 logger.error(f"Error during schedule contact update: {e}")
#             await asyncio.sleep(expiry_seconds)
#         else:
#             await asyncio.sleep(30)
#     finally:
#         await redis_client.close()
#         await redis_client.connection_pool.disconnect()
