import logging

import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasicCredentials
from starlette.config import Config

from app.components.auth.fastapi_auth import verify_credentials  # , get_secret_key
from app.components.auth.jwt_token_handler import get_jwt_secret_key
from app.components.initial_users import create_initial_users
from app.db.mongoClient import async_client
from app.routers import auth, users, chatgpt

# loading the FastAPI app
app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)

# Read the configuration
config = Config(".env")

# Configure CORS settings
origins = [
    "*",  # Allows all origins
    # "http://localhost:3000",  # Allows only the specified origin
]

# Add CORS middleware
app.add_middleware(CORSMiddleware,  # type: ignore
                   allow_origins=origins,
                   allow_credentials=True,  # Allows credentials (cookies, authorization headers, etc.)
                   allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],  # Specifies the allowed request methods
                   allow_headers=["*"],  # Allows all headers
                   expose_headers=["Content-Disposition"]  # Expose Content-Disposition header to the client
                   )

# API default path
prefix_path = '/api/v1'

# Routers
app.include_router(auth.router, prefix=prefix_path, tags=["auth"])
app.include_router(users.router, prefix=prefix_path, dependencies=[Depends(get_jwt_secret_key)], tags=["users"])
app.include_router(chatgpt.router, prefix=prefix_path, dependencies=[Depends(get_jwt_secret_key)], tags=["chatgpt"])


# app.include_router(model35.router, prefix=prefix_path, dependencies=[Depends(get_secret_key)], tags=["users"]) # example of static dependency, static secret_key from .env


@app.get("/openapi.json", include_in_schema=False)
async def get_open_api_endpoint(credentials: HTTPBasicCredentials = Depends(verify_credentials)):  # noqa
    """
    OpenAPI endpoint
    :param credentials:
    :return:
    """
    from fastapi.openapi.utils import get_openapi

    openapi_schema = get_openapi(
        title="Your app title is here",
        version="v1.00",
        description="You app description is here",
        routes=app.routes,
    )

    return openapi_schema


@app.get("/docs", include_in_schema=False)
async def custom_docs_url(credentials: HTTPBasicCredentials = Depends(verify_credentials)):  # noqa
    """
    Swagger UI endpoint
    :param credentials:
    :return:
    """
    from fastapi.openapi.docs import get_swagger_ui_html
    return get_swagger_ui_html(swagger_ui_parameters={"syntaxHighlight.theme": "obsidian", "docExpansion": "none"},
                               openapi_url="/openapi.json", title=app.title)  # noqa


@app.get("/redoc", include_in_schema=False)
async def custom_redoc_url(credentials: HTTPBasicCredentials = Depends(verify_credentials)):  # noqa
    """
    ReDoc UI endpoint
    :param credentials:
    :return:
    """
    from fastapi.openapi.docs import get_redoc_html
    return get_redoc_html(openapi_url="/openapi.json", title=app.title)  # noqa


@app.on_event("startup")
async def startup():
    """
    On startup create initial users
    """
    try:
        await create_initial_users()
    except Exception as e:  # noqa
        pass


@app.on_event("shutdown")
async def shutdown():
    """
    On Shutdown close the MongoDB connection
    """
    logging.info("Shutdown the application and close the MongoDB connection")
    async_client.close()


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
