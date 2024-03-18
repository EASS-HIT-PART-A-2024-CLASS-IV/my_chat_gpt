import os

from dotenv import load_dotenv

from app.classes.User import UserCreate
from app.routers.users import create_user

load_dotenv()  # loading environment variables


async def create_initial_users():
    admin_user = {
        "username": os.getenv("admin_username"),
        "email": os.getenv("admin_email"),
        "full_name": "Site Administrator",
        "disabled": False,
        "password": os.getenv("admin_password"),
        "role": "admin"
    }
    # Directly call the logic to create a user
    # Adjust according to your actual logic if directly interacting with the database
    await create_user(UserCreate(**admin_user), "system_init")
