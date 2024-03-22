# Full-Stack User Management System with FastAPI, Next.js, and MUI

## Overview

This Full-Stack User Management System combines a robust backend built with FastAPI for handling user operations such as registration, authentication, and profile management with a modern, responsive frontend designed using Next.js and Material-UI (MUI). The application ensures secure user authentication leveraging JSON Web Tokens (JWT), safeguarding sensitive information and actions. It's designed to offer a seamless, interactive user experience while maintaining high standards of security and performance.

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

* Create .env file, in the root folder.
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
  
  #chatgpt
  open_ai_organization=org-your_openai_key
  open_ai_secret_key=sk-your_openai_key
  
  # default admin user
  admin_username=admin
  admin_password=bringthemhome
  admin_email=israel@israeli.com
  ```


### Full Docker Installation (4 Containers)
* This is complete installation, mongodb and redis servers included.
    ```shell
    docker-compose build --no-cache ; docker-compose up -d
    ``` 
  or
    ```shell
    docker-compose up -d --build
    ```
  *in .env variables change mongodb_server=localhost to mongodb_server=mongodb if you are using docker-compose.* 

### Start just the Backend
Just the FastApi server. You must start mongodb server, redis server first. Change the username and password uri in the .env file above.

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


## Usage

- Frontend: [http://localhost:3000](http://localhost:3000)
  ```swagger codegen
  Username: admin
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
If you find my work helpful, consider supporting me by buying me a coffee at [Buy Me A Coffee](https://www.buymeacoffee.com/georgekhananaev). Your support helps me continue to create and maintain useful projects. Thank you!
