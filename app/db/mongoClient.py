import os

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

# from pymongo import MongoClient

load_dotenv()  # loading environment variables

MONGODB_USER = os.getenv("mongodb_username")
MONGODB_PASS = os.getenv("mongodb_password")
MONGODB_SERVER = os.getenv("mongodb_server")
MONGODB_PORT = os.getenv("mongodb_port")

MONGODB_CONNECTION_STRING = f"mongodb://{MONGODB_USER}:{MONGODB_PASS}@{MONGODB_SERVER}:{MONGODB_PORT}"

# # Synchronous MongoDB connection
# sync_connection_string = f'{MONGODB_CONNECTION_STRING}'  # mongodb server connection string
# sync_client = MongoClient(sync_connection_string)  # setting mongodb client for synchronous operations
# sync_database = sync_client['fastapi_db']  # database name in mongodb for synchronous operations

# Asynchronous MongoDB connection
async_connection_string = f'{MONGODB_CONNECTION_STRING}'  # This can be the same as the synchronous connection string
async_client = AsyncIOMotorClient(async_connection_string)  # setting mongodb client for asynchronous operations
async_database = async_client['fastapi_db']  # database name in mongodb for asynchronous operations
