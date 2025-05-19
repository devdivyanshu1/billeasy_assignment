# Billeasy Assignment Backend API

## Overview  
Backend API built with Node.js, Express, JWT authentication, and MongoDB for user management.

---

## Setup Instructions

1. Clone the repo:  


Server will run at `http://localhost:3000`

---

## API Endpoints

| Endpoint        | Method | Description                  | Auth Required |
|-----------------|--------|------------------------------|--------------|
| `/api/register` | POST   | Register new user            | No           |
| `/api/login`    | POST   | Login user, returns JWT cookie | No         |
| `/api/profile`  | GET    | Get logged-in user profile   | Yes          |

---

## Request Body Example (Register / Login)

```json
{
  "name": "John Doe",        // name needed only for register
  "email": "john@example.com",
  "password": "password123"
}

Authentication Details
JWT token is signed with SECRET_KEY from .env and stored as an HTTP-only cookie named token.

Protected routes require this token.

Middleware verifies token and sets req.id with the user ID from the token.

billeasy_assignment/
├── controllers/    # Route logic
├── middlewares/    # Authentication middleware
├── models/         # Mongoose schemas
├── routes/         # API routes
├── .env            # Environment variables (not committed)
├── index.js        # Server entry point
├── package.json    # Project config and dependencies
└── README.md       # This file
Server runs at `http://localhost:5000`

---

## 3. RESTful APIs

### 3.1 Register User  
- **POST** `http://localhost:5000/api/register`  
- Body: `{ "name": "John", "email": "john@example.com", "password": "password123" }`  
- Description: Create new user account.

### 3.2 Login User  
- **POST** `http://localhost:5000/api/login`  
- Body: `{ "email": "john@example.com", "password": "password123" }`  
- Description: Authenticate user, returns JWT token in cookie.

### 3.3 Get User Profile  
- **GET** `http://localhost:5000/api/profile`  
- Headers: Cookie with JWT token required  
- Description: Get logged-in user profile info.

### 3.4 Update User Profile  
- **PUT** `http://localhost:5000/api/profile`  
- Headers: Cookie with JWT token required  
- Body: `{ "name": "John Updated" }` (example)  
- Description: Update logged-in user details.

### 3.5 Logout User  
- **POST** `http://localhost:5000/api/logout`  
- Description: Clear authentication token cookie to logout.

---

## 4. How to Use in Postman

1. **Register:** POST `/api/register` with JSON body.  
2. **Login:** POST `/api/login` with JSON body. Postman saves cookie.  
3. **Get Profile:** GET `/api/profile` (cookie sent automatically).  
4. **Update Profile:** PUT `/api/profile` with JSON body (cookie needed).  
5. **Logout:** POST `/api/logout`.

---

## 5. Database Schema (Users)

| Field    | Type     | Description          |
|----------|----------|----------------------|
| _id      | ObjectId | MongoDB unique ID    |
| name     | String   | User full name       |
| email    | String   | Unique email         |
| password | String   | Hashed password      |
| createdAt| Date     | Account creation time|

---

## 6. Notes

- Passwords are hashed.  
- JWT stored in HTTP-only cookie `token`.  
- Auth middleware validates JWT, sets `req.id` for user id.  
- Environment variables store secrets securely.

---



