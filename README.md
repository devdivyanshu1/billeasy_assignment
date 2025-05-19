## Billeasy Assignment Backend API
Overview
This is a backend API built with Node.js, Express, MongoDB, and JWT for user authentication and management.

Setup
Clone the repository.

Install dependencies with npm install.

Run the server:


npm start
The server will be running at http://localhost:3000.



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



Schemas:
Database Schema
The app uses MongoDB with three main collections:

1. Users
Stores user details:

username: String, required, minimum 3 characters

email: Unique, required, stored in lowercase

password: Hashed, required, minimum 6 characters

Timestamps track when each user was created and updated

2. Books
Stores book info:

title: String, required

author: String, required

genre: Optional string

reviews: Array of references to Review documents

Timestamps included

3. Reviews
Stores reviews for books by users:

user: Reference to a User (required)

book: Reference to a Book (required)

rating: Number between 1 and 5 (required)

comment: Optional text, max 1000 characters

Timestamps included

Project Setup
Clone the repository:


git clone https://github.com/devdivyanshu1/billeasy_assignment.git
cd billeasy_assignment
Install dependencies:

npm install
Create a .env file in the root folder and add your environment variables (example):


PORT=3000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
How to Run Locally
Start the server with:


npm start
The API will be available at:

1. Sign Up a New User
POST http://localhost:3000/signup
Body (JSON):

json
Copy
Edit
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}
🔑 2. Login
POST http://localhost:3000/login
Body (JSON):

json
Copy
Edit
{
  "email": "john@example.com",
  "password": "password123"
}
💡 This sets a cookie with the JWT token, which Postman can automatically use for future requests.

📚 3. Create a New Book (Protected)
POST http://localhost:3000/books
Headers:
Cookie: Sent automatically after login
Body (JSON):

json
Copy
Edit
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self-help"
}
📚 4. Get All Books
GET http://localhost:3000/books

📖 5. Get Book by ID
GET http://localhost:3000/books/<BOOK_ID>

Replace <BOOK_ID> with the actual MongoDB _id of a book.

✍️ 6. Add Review to Book (Protected)
POST http://localhost:3000/books/<BOOK_ID>/reviews
Headers:
Cookie: Sent automatically after login
Body (JSON):

json
Copy
Edit
{
  "rating": 5,
  "comment": "Very helpful and well-written!"
}
✏️ 7. Update Review (Protected)
PUT http://localhost:3000/reviews/<REVIEW_ID>
Headers:
Cookie: Sent automatically after login
Body (JSON):

json
Copy
Edit
{
  "rating": 4,
  "comment": "Updated comment: Still great!"
}
❌ 8. Delete Review (Protected)
DELETE http://localhost:3000/reviews/<REVIEW_ID>
Headers:
Cookie: Sent automatically after login

🔍 9. Search Books
GET http://localhost:3000/search?query=habits

