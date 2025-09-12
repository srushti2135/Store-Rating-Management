FullStack Project scaffold
-------------------------

Backend:
- Express + Sequelize (MySQL)
- Models: User, Store, Rating
- Routes: /api/auth, /api/users, /api/stores, /api/ratings
- Middleware: JWT auth and role-based access
- Controllers implement CRUD and basic dashboard logic

Frontend:
- React (simple setup using react-scripts)
- Components: Login, Signup, Dashboard, StoreList, StoreDetails
- Auth stored in localStorage (token)
- Protected routes example in App.js

Database:
- schema_and_seed.sql includes schema and an admin seed user (password hash placeholder)

How to run:
1. Backend:
   - cd backend
   - copy .env.example to .env and set DB credentials & JWT_SECRET
   - npm install
   - npm run dev

2. Frontend:
   - cd frontend
   - npm install
   - npm start

Notes:
- This is a scaffold and working prototype. You may need to adjust DB credentials and install dependencies.


Use this Login Details:-
Email: admin@example.com
Password: StrongPass@1


