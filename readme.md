# Simple Notes Application
## Description
A web application for users to securely manage their notes. This application includes user authentication and authorization using JWT, secure password hashing with bcrypt, and data management with MongoDB.

## Features
1. User Authentication:
   * Secure user registration and login with password hashing.
   * JWT-based authentication for secure access.
2. Notes Management: 
   * CRUD operations for creating, reading, updating, and deleting notes.
   * Authorization to ensure users can only access their own notes.
3. Database: 
   * MongoDB for efficient data storage and retrieval.
   * Mongoose for object data modeling (ODM).
4. Technologies Used:
   * Backend: Node.js, Express.js
   * Database: MongoDB, Mongoose
   * Authentication: JSON Web Tokens (JWT), bcrypt