UserAssignment_Admin_Acceptance
Project Description
The UserAssignment_Admin_Acceptance project is a task management system that allows users and admins to log in and out. Users can create tasks by tagging an admin, while admins have the ability to accept or reject those tasks. The project is built using Node.js, Express.js, and MongoDB, with Postman utilized for testing API endpoints.

Features
User Authentication: Users and admins can log in and log out securely.
Task Creation: Users can create tasks and tag an admin for assignment.
Admin Actions: Admins can view the tasks they are tagged in and either accept or reject tasks.
Duplicate Email Prevention: The system prevents users from registering with duplicate email addresses.
Protected Endpoints: The task acceptance and rejection endpoints are protected with authorization, ensuring that only authenticated admins can perform these actions.
Technologies Used
Node.js: Backend runtime environment
Express.js: Web framework for Node.js
MongoDB: NoSQL database for storing user and task information
Postman: API testing tool
Installation and Setup
Clone the repository from GitHub:

bash
Copy code
git clone <repository-url>
Extract the files from the downloaded repository.

Navigate to the project directory:

bash
Copy code
cd UserAssignment_Admin_Acceptance
Install dependencies using npm:

bash
Copy code
npm install
Start the server:

bash
Copy code
npm start
Environment Setup: Ensure MongoDB is running, and configure the .env file with the correct MongoDB URI and other environment variables.

Requirements
Node.js
npm
MongoDB (ensure a MongoDB instance is running)
Visual Studio Code or any IDE of your choice
API Endpoints
User Endpoints
Register a new user:
POST localhost:5000/api/users/register

User login:
POST localhost:5000/api/users/login

Admin Endpoints
Register a new admin:
POST localhost:5000/api/admins/register

Admin login:
POST localhost:5000/api/admins/login

Task Management Endpoints
Accept a task (Protected, Admin only):
PATCH localhost:5000/api/assignments/:id/accept

Reject a task (Protected, Admin only):
PATCH localhost:5000/api/assignments/:id/reject

Running the Project
Ensure you have all required software installed (Node.js, npm, MongoDB, etc.).
Clone the repository and install dependencies as outlined above.
Start your MongoDB instance and make sure the database connection is configured properly.
Use Postman to test the endpoints, or integrate with your frontend.
License
This project is licensed under the MIT License