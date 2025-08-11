# User Management API

A RESTful API for managing users with full CRUD functionality.  
Built with Node.js, Express, and Firebase Firestore.

---

## Overview

This API allows you to create, read, update, and delete user records containing the following fields:

- First Name
- Last Name
- Date of Birth
- Phone Number
- Email Address

---

## Technologies Used

- Node.js
- Express
- Firebase Firestore
- CORS
- dotenv

---

## Requirements

- Node.js (version 14 or higher)
- A Firebase project with Firestore enabled
- `serviceAccountKey.json` file from Firebase service account credentials

---

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/YourUsername/User-Management.git
   cd User-Management

2. Install dependencies:
 ```bash
 npm install

3. Create a Firebase project and enable Firestore:
Firebase Console

4. Generate and download the serviceAccountKey.json from Firebase Console under Project Settings > Service Accounts.

5. Place the serviceAccountKey.json file in the root directory of the project.

6. Create a .env file (optional) to specify the port:
 ```bash
PORT=3000

7. Start the application:
 ```bash
 npm run dev

8. Open your browser and navigate to http://localhost:3000

API Endpoints
Base URL: /api/users

Method	 Endpoint	 Description
POST	  /	         Create a new user
GET	      /	         Get all users (supports filtering, search, pagination)
GET	      /:id	     Get a user by ID
PUT	      /:id	     Update a user by ID
DELETE	  /:id	     Delete a user by ID

Example User JSON for Creation
 ```bash
{
  "firstName": "Ivan",
  "lastName": "Petrov",
  "dateOfBirth": "1990-01-01",
  "phoneNumber": "+359888123456",
  "email": "ivan@example.com"
}

Frontend
A simple frontend is provided in the public folder, containing HTML, CSS, and JavaScript files that demonstrate how to interact with the API.

Notes
For full API documentation, see api-docs.md.

You may consider adding Swagger or similar tools for automated API docs.

Check your console logs for errors or issues related to Firebase setup.

Contact
For questions or suggestions, please contact me