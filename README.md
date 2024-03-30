# Full-Stack User Management System with FastAPI, Next.js, and MUI & More...

**THE SYSTEM IS UNDER HEAVY DEVELOPMENT, STAY TUNED!**

## Overview

A full-stack system utilizing FastAPI with asynchronous capabilities on the backend and Next.js for the frontend showcases the robustness of Python in server-side development. This architecture provides a scalable, efficient solution that leverages FastAPI's high performance and ease of use for creating APIs, alongside Next.js for a reactive and server-side rendered user interface. The asynchronous nature of the backend ensures non-blocking operation, enhancing the system's ability to handle high volumes of requests simultaneously, which is ideal for real-time applications. This combination offers a modern, full-stack framework that is both powerful and developer-friendly, demonstrating the versatility of Python in web development.

## Key Features

### Security

- **JWT Authentication**: Secure authentication mechanism using JWT to ensure that user actions are verified and secure.
- **Protected API Documentation**: Access to API documentation is restricted, requiring authentication to prevent unauthorized use.
- **Rate Limiting**: Defense against brute force attacks by limiting the number of login attempts.
- **Data Encryption**: Encryption techniques are employed to securely store user data.

### User Management

- **Registration and Login**: Efficient and secure processes for user registration and login.
- **Profile Management**: Enables users to update their profiles and manage account settings.

### Frontend Experience

- **Next.js and MUI**: A modern, responsive UI built with Next.js and Material-UI for a seamless user experience.
- **Responsive Design**: Ensures a consistent experience across various devices and screen sizes.

## Technologies Used

- **FastAPI**: For building the high-performance API backend.
- **Next.js**: The React framework for building the frontend.
- **Material-UI (MUI)**: For designing the frontend with React UI components.
- **MongoDB**: As the NoSQL database for user data.
- **Redis**: For rate limiting and JWT token management.
- **Docker**: For containerizing and deploying the application.
- **Python-JOSE**: A library for JWT operations.
- **SMTP Libraries**: For sending automated email notifications.

## Getting Started

### Prerequisites

- Docker and Docker Compose
- An instance of MongoDB
- An instance of Redis

## Installation

### Docker Installation for Full Deployment (4 Containers)

1. create chatgpt_credentials.env file or revise the code in "generate_env.py"

- Example:

  ```
  # chatgpt
  open_ai_organization=org-your_openai_key
  open_ai_secret_key=sk-your_openai_key

  ```

2. This is complete installation, mongodb and redis servers included.

- PowerShell / Linux (Option 1)
  ```shell
  python generate_env.py ; docker-compose build --no-cache ; docker-compose up -d
  ```
- CMD (Option 2)
  ```shell
  python generate_env.py && docker-compose build --no-cache && docker-compose up -d
  ```
- Manual (Option 3)
  ```shell
  python generate_env.py
  ```
  ```shell
  docker-compose build --no-cache
  ```
  ```shell
  docker-compose up -d
  ```

### Start just the Backend

Just the FastApi server. You must start mongodb server, redis server first. Change the username and password uri in the .env file above.

<details>
<summary><b>Create a .env File or Run `python generate_env.py`</b></summary>
<p>

```text
# mongodb connection
mongodb_server=localhost
mongodb_port=27017
mongodb_username=bringthemhome
mongodb_password=bringthemhome

# fastapi
fastapi_ui_username=bringthemhome
fastapi_ui_password=bringthemhome
jwt_secret_key=bringthemhome
static_bearer_secret_key=bringthemhome
algorithm=HS256

# chatgpt
open_ai_organization=org-your_openai_key
open_ai_secret_key=sk-your_openai_key

# default root user
owner_username=root
owner_password=bringthemhome
owner_email=israel@israeli.com

# Initial email settings located in app/components/initial settings.py
```

Please note: mongodb uri should be "localhost" if you running it locally, or "mongodb" if you running it inside a docker
container

</p>
</details>

- Update PIP && Install requirements.txt

  ```shell
  python.exe -m pip install --upgrade pip
  ```

  ```shell
   pip install -r requirements.txt
  ```

- Start FastAPI server with Uvicorn

  ```shell
  uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
  ```

### Start just the Frontend

You need to have Node.js installed on your machine.
Visit https://nodejs.org/ to download and install the latest version.

<details>
<summary><b>Create a .env File If Necessary; Otherwise, Default Settings Are Loaded</b></summary>
<p>

```text
# Set the URL for your backend here
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1

# The default value is 'bringthemhome'. Ensure this matches the 'static_bearer_secret_key' set in your backend.
NEXT_PUBLIC_API_KEY=static_bearer_secret_key
```

Please note: If you are running MongoDB locally, the URI should be set to "localhost". If you are running MongoDB inside a Docker container, the URI should be set to "mongodb".
container

</p>
</details>

- <b>For Development:</b>

  ```shell
  npm install
  ```

  ```shell
   npm run dev
  ```

- <b>For Production:</b>
  ```shell
  npm run build
  ```
  ```shell
    npm start
  ```

## Uninstall

```shell
docker-compose down -v
```

## Usage

- Frontend: [http://localhost:3000](http://localhost:3000)
  ```swagger codegen
  Username: root
  Password: bringthemhome
  ```

* Access the API documentation at http://localhost:8000/docs. You can obtain a token by entering your username and password from the text box above.
* Please note that the Swagger UI is also password-protected, and it will temporarily block access if the password is entered incorrectly more than five times, for a duration of five minutes.
  ```swagger codegen
  Username: bringthemhome
  Password: bringthemhome
  ```
