# Full-Stack User Management System with FastAPI, Next.js, and MUI & More...
**THE SYSTEM IS UNDER HEAVY DEVELOPMENT, STAY TUNED!**

## Overview

A full-stack system utilizing FastAPI with asynchronous capabilities on the backend and Next.js for the frontend showcases the robustness of Python in server-side development. This architecture provides a scalable, efficient solution that leverages FastAPI's high performance and ease of use for creating APIs, alongside Next.js for a reactive and server-side rendered user interface. The asynchronous nature of the backend ensures non-blocking operation, enhancing the system's ability to handle high volumes of requests simultaneously, which is ideal for real-time applications. This combination offers a modern, full-stack framework that is both powerful and developer-friendly, demonstrating the versatility of Python in web development.

_"Why python? In just a few days, I was able to develop an advanced system; imagine the vast expanse of innovation we
could unlock with several months at our disposal. The only limit to what we can achieve lies in the breadth of our
imagination." - George Khananaev_

## Key Features

### Security
- **JWT Authentication**: Secure authentication mechanism using JWT to ensure that user actions are verified and secure.
- **Protected API Documentation**: Access to API documentation is restricted, requiring authentication to prevent unauthorized use.
- **Rate Limiting**: Defense against brute force attacks by limiting the number of login attempts.
- **Data Encryption**: Encryption techniques are employed to securely store user data.


### User Management
- **Registration and Login**: Efficient and secure processes for user registration and login.
- **Profile Management**: Enables users to update their profiles and manage account settings.

### Interactivity and Notifications
- **ChatGPT Integration**: Enhances user engagement with AI-driven chat support.
- **Email Notifications**: Sends automated emails for actions such as registration and password resets using SMTP.

### Frontend Experience
- **Next.js and MUI**: A modern, responsive UI built with Next.js and Material-UI for a seamless user experience.
- **Responsive Design**: Ensures a consistent experience across various devices and screen sizes.

### Performance and Scalability
- **Asynchronous Support**: Utilizes FastAPI's async features for efficient performance.
- **Scalable Architecture**: Designed to handle growth in users and data smoothly.

### Logging and Monitoring
- **Comprehensive Logging**: Detailed logging for user actions, system events, and errors.
- **Real-Time Monitoring**: Tools and practices in place for monitoring application performance in real-time.

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
* Clone the project repository:
   ```shell
   git clone https://github.com/georgekhananaev/fullstack-user-management-system.git
   ```

### Full Docker Installation (4 Containers)

first create chatgpt_credentials.env or modify it in "generate_env.py"

```
# chatgpt
open_ai_organization=org-your_openai_key
open_ai_secret_key=sk-your_openai_key

```

* This is complete installation, mongodb and redis servers included.

  PowerShell / Linux
    ```shell
    python generate_env.py ; docker-compose build --no-cache ; docker-compose up -d
    ``` 
  CMD
    ```shell
    python generate_env.py && docker-compose build --no-cache && docker-compose up -d
    ```
  Manually
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
<summary><b>Create a .env file in the root folder or run" python generate_env.py</b></summary>
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

* Update PIP && Install requirements.txt
    ```shell
    python.exe -m pip install --upgrade pip
    ```
    ```shell
     pip install -r requirements.txt
    ```

* Start FastAPI server with Uvicorn

    ```shell
    uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
    ```

### Start just the Frontend
You need to have Node.js installed on your machine.
Visit https://nodejs.org/ to download and install the latest version.

<details>
<summary><b>Create a .env file if needed, otherwise default is loaded.</b></summary>
<p>

```text
# Set the URL for your backend here
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1

# The default value is 'bringthemhome'. Ensure this matches the 'static_bearer_secret_key' set in your backend.
NEXT_PUBLIC_API_KEY=static_bearer_secret_key
```

Please note: mongodb uri should be "localhost" if you running it locally, or "mongodb" if you running it inside a docker
container
</p>
</details>

* <b>For Development:</b>

    ```shell
    npm install
    ```
    ```shell
     npm run dev
    ```

* <b>For Production:</b>
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


## Security Practices
This application implements advanced security practices including password hashing, token validation, rate limiting, and secure API documentation access.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

## Credits
- Developed by George Khananaev.
- Thanks to the FastAPI, MongoDB, Redis, and Docker communities for support and resources.

## Support Me

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/georgekhananaev)

If you find my work helpful, consider supporting me by buying me a coffee at [Buy Me A Coffee](https://www.buymeacoffee.com/georgekhananaev). 

Your support helps me continue to create and maintain useful projects. Thank you!
