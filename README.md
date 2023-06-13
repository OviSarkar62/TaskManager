# TaskManager

Welcome to TaskManager! This project is a simple task management tool that allows you to organize and keep track of your tasks. It is designed to be user-friendly and intuitive, making it ideal for beginners who want to manage their tasks efficiently. This tool provides a user-friendly interface for creating projects, adding tasks, assigning team members, setting deadlines, and tracking progress.

Visit complete live project [TASK MANAGER](https://tsk-manager.vercel.app/login)

Owner Email: `ovi@gmail.com`,
Owner Password: `Iamowner00@`

Admin Email: `mitul@gmail.com`,
Admin Password: `Iamadmin00@`

Employee Email: `utsho@gmail.com`,
Employee Password: `Iamemployee00@`

## Features
### 1. Project Management:

- Create and manage projects with ease. Track project details and progress in a centralized location.

### 2. Task Tracking: 

- Add tasks to projects, assign team members, and track task completion.

### 3. Notifications: 

- Receive notifications for upcoming deadlines, task assignments, and project updates.

### 4. User Roles: 

- Assign different roles like Admin to the team leads and employee to the related team members to manage permissions and access levels.

## Stack

- MongoDB - NoSQL database for storing data
- Express - Backend framework for building RESTful APIs
- React - Frontend framework for building user interfaces
- Node.js - JavaScript runtime environment for building scalable server-side applications
- JWT - JSON Web Token for user authentication and authorization
- Bcryptjs - Password hashing library for secure password storage

## Installation

To set up Task Manager locally, follow these steps:

- Clone the repository:

      git clone https://github.com/OviSarkar62/TaskManager.git
      
- Navigate to the project directory:

      cd TaskManager

- Install the required dependencies for backend:

      npm i express dotenv colors bcryptjs joi jsonwebtoken mongoose nodemon zxcvbn
     
- Navigate to the client directory: 

       cd client
    
- Install the dependencies for the client: 

       npm i react-router-dom redux react-redux axios antd @reduxjs/toolkit react-hot-toast
    
- Create a .env file in the root directory with the following environment variables:

       mongo_url = mongodb+srv://<user>:<pass>@cluster0.l17quyr.mongodb.net/database

       jwt_secret = A_Secret_Value

- Start the server: 

       npm start
    
- In a new terminal window, navigate to the client directory:

       cd client
    
- Start the client: 

       npm start
    
- Access the application. Open your web browser and visit http://localhost:3000 to access the Project-Tracker application.
