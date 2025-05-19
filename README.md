## Billeasy Assignment Backend API
Overview
This is a backend API built with Node.js, Express, MongoDB, and JWT for user authentication and management.

Setup
Clone the repository.

Install dependencies with npm install.

Run the server:


npm start
The server will be running at http://localhost:3000.

API Endpoints
Endpoint	Method	Description	Auth Required
/api/register	POST	Register a new user	No
/api/login	POST	Login and get auth token	No
/api/profile	GET	Get user profile info	Yes
/api/profile	PUT	Update user profile	Yes
/api/logout	POST	Logout user	Yes

How to Use the API
Register: Send a POST request to /api/register with JSON body like:

json
Copy
Edit
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Login: POST to /api/login with email and password. The API sends back a JWT token stored in an HTTP-only cookie.

Profile: Use the /api/profile endpoint to GET or PUT your profile info. Make sure your request includes the cookie with the JWT token.

Logout: POST to /api/logout to clear the authentication token.

Authentication
Passwords are securely hashed.

JWT tokens are signed and stored as HTTP-only cookies named token.

Protected routes verify the token and identify the user via req.id.

Project Structure
bash
Copy
Edit
billeasy_assignment/
├── controllers/    # Route handlers
├── middlewares/    # Auth middleware
├── models/         # Database schemas
├── routes/         # API routes
├── .env            # Environment variables (not shared)
├── index.js        # Server entry point
├── package.json    # Project config and dependencies
└── README.md       # This file
