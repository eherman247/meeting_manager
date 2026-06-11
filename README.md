# Meeting Manager

Meeting Manager is a scheduling and availability coordination app with an Express/MongoDB backend and React frontend.

## Structure

- `backend/` - Node.js API server with auth, rate limiting, email verification, and time-off session data.
- `frontend/` - React app built with Create React App.
- `DEPLOY.md` - deployment and production configuration guidance.
- `docker-compose.yml` - optional containerized local deployment for backend, frontend, MongoDB, and Redis.

## Quick start

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm start
```

For production deployment details, see `DEPLOY.md`.
