from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field, EmailStr


# Define roles
class Role(str, Enum):
    admin = "admin"
    user = "user"


class UserBase(BaseModel):
    username: str  # User's username
    email: EmailStr  # User's email, validated to be a proper email format
    full_name: str  # User's full name
    disabled: Optional[bool] = None  # Optional field to disable the user
    role: Role = Role.user  # Default role


class UserCreate(UserBase):
    password: str  # Password field for user creation


class User(UserBase):
    id: Optional[str] = Field(default=None, alias="_id")  # User ID, mapping MongoDB's '_id'

    @classmethod
    def from_mongo(cls, data: dict):
        if "_id" in data:
            data["_id"] = str(data["_id"])  # Convert MongoDB ObjectId to string
        return cls(**data)  # Create User instance with modified data

    class Config:
        json_schema_extra = {
            "example": {
                "username": "israel",
                "email": "israel@example.com",
                "full_name": "israel israeli",
                "disabled": False,
            }
        }
        from_attributes = True  # Enable ORM mode for compatibility with databases
        populate_by_name = True  # Allows field population by name, useful for fields with aliases
