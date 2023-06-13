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

       npm i react-router-dom redux react-redux axios antd @reduxjs/toolkit moment
    
- Create a .env file in the root directory with the following environment variables:

       DB_URL = mongodb+srv://<user>:<pass>@cluster0.l17quyr.mongodb.net/database

       JWT_SECRET = A_Secret_Value
       
       PORT = 4000

- Start the server: 

       npm start
    
- In a new terminal window, navigate to the client directory:

       cd client
    
- Start the client: 

       npm start
    
- Access the application. Open your web browser and visit http://localhost:3000 to access the Task Manager application.

## Usage

- Start the project:

       npm start
 
- At first all the team members i.e. Owner, Admins and Employees need to register in the Task Manager.
- Then the Owner need to login to add projects.
- After creating projects, the owner need to add members to the project. Only registered members can be added for the projects.
- The owner can assign roles to the added members.
- Only Owner and Admin can assign tasks to the employees with due date.
- Owner, Admins and only the employee who is assigned the particular task can change the task status.
- When the status will be changed then the connected members will receive the notifications.

## API Endpoints

### User Related

- [ ] RegisterUser: `POST localhost:4000/api/users/register`
- [ ] LoginUser: `POST localhost:4000/api/users/login`
- [ ] GetLoggedInUser: `GET localhost:4000/api/users/get-logged-in-user`

### Project Related

- [ ] CreateProject: `POST localhost:4000/api/projects/create-project`
- [ ] GetAllProjects: `POST localhost:4000/api/projects/get-all-projects`
- [ ] GetProjectById: `POST localhost:4000/api/projects/get-project-by-id`
- [ ] EditProject: `POST localhost:4000/api/projects/edit-project`
- [ ] DeleteProject: `POST localhost:4000/api/projects/delete-project`
- [ ] GetProjectsByRole: `POST localhost:4000/api/projects/get-projects-by-role`
- [ ] AddMemberToProject: `POST localhost:4000/api/projects/add-member`
- [ ] RemoveMemberFromProject: `POST localhost:4000/api/projects/remove-member`

### Task Related

- [ ] CreateTask: `POST localhost:4000/api/tasks/create-task`
- [ ] GetAllTasks: `POST localhost:4000/api/tasks/get-all-tasks`
- [ ] UpdateTask: `POST localhost:4000/api/tasks/update-task`
- [ ] DeleteTask: `POST localhost:4000/api/tasks/delete-task`

### Notification Related

- [ ] AddNotification: `POST localhost:4000/api/notifications/add-notification`
- [ ] GetAllNotifications: `GET localhost:4000/api/notifications/get-all-notifications`
- [ ] MarkNotificationAsRead: `POST localhost:4000/api/notifications/mark-as-read`
- [ ] DeleteAllNotifications: `DELETE localhost:4000/api/notifications/delete-all-notifications`
