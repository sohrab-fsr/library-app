# Library App Frontend (Second Release)

This is the React frontend for the Library App project. It connects to the
existing Node.js + Express + MongoDB backend built in the First Release.

## Features in this release

- Home/Landing page with site name and simple logo.
- Sign Up and Sign In pages that call the backend auth API.
- Authenticated navigation bar:
  - Shows Home, My Books, My Profile, and Sign Out when logged in.
  - Shows Home, Sign In, and Sign Up when logged out.
- My Books page with full CRUD (Create, Read, Update, Delete) for books
  belonging to the logged-in user.
- My Profile page that shows basic user information returned from the backend.
- React Router for navigation between views.

## Requirements

- Node.js (LTS) installed.
- The backend server from Release 1 running at `http://localhost:3000`


## Getting started

Backend terminal

cd path\to\library-app-backend
npm install        # first time only
npm run dev        # or npm start


Frontend terminal

cd path\to\library-app-frontend
npm install        # first time only
npm run dev

Browser

Open: http://localhost:5173/

Sign Up → My Books → add/edit/delete books

Home / My Profile / Sign Out all work through the API



git push -u origin main --force