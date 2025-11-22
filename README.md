# Library App - Backend (First Release)


1. Install dependencies:

   ```bash
   npm install
   ```


2. Run the server in development mode:

   ```bash
   npm run dev
   ```

   Or in normal mode:

   ```bash
   npm start
   ```

3. Test the APIs (example URLs):

   - `POST http://localhost:3000/api/auth/signup`
   - `POST http://localhost:3000/api/auth/login`
   - `GET  http://localhost:3000/api/auth/me` (requires `Authorization: Bearer <token>`)
   - `POST http://localhost:3000/api/books` (requires token)
   - `GET  http://localhost:3000/api/books` (requires token)
   - `GET  http://localhost:3000/api/books/:id` (requires token)
   - `PUT  http://localhost:3000/api/books/:id` (requires token)
   - `DELETE http://localhost:3000/api/books/:id` (requires token)

