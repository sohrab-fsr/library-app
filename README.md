# Library App - Backend (First Release)

This is the backend for the Library App project. It provides a simple REST API
for user authentication and managing a personal collection of books.

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT (JSON Web Tokens) for authentication
- bcrypt for password hashing

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with at least:

   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/library_app
   JWT_SECRET=changeme_to_a_long_random_string
   PORT=3000
   ```

3. Run the server in development mode:

   ```bash
   npm run dev
   ```

   Or in normal mode:

   ```bash
   npm start
   ```

4. Test the APIs (example URLs):

   - `POST http://localhost:3000/api/auth/signup`
   - `POST http://localhost:3000/api/auth/login`
   - `GET  http://localhost:3000/api/auth/me` (requires `Authorization: Bearer <token>`)
   - `POST http://localhost:3000/api/books` (requires token)
   - `GET  http://localhost:3000/api/books` (requires token)
   - `GET  http://localhost:3000/api/books/:id` (requires token)
   - `PUT  http://localhost:3000/api/books/:id` (requires token)
   - `DELETE http://localhost:3000/api/books/:id` (requires token)

