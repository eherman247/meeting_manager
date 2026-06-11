# Deployment & Production Configuration Guide

This document outlines recommended steps to deploy Meeting Manager to production, required environment variables, and operational suggestions.

## Required environment variables

- `MONGO_URI` - MongoDB connection string (use a managed service).
- `PORT` - Port the backend listens on (e.g. `4000`).
- `SECRET` - JWT signing secret (keep secret, rotate periodically).
- `RESEND_MEETING_MANAGER_API_KEY` - API key for Resend email service.
- `RESEND_EMAIL` - From address used to send emails.
- `FRONTEND_URL` - Public URL of the frontend app (e.g. `https://app.example.com`). Used in email links.
- `REDIS_URL` _(optional but recommended)_ - Redis connection for rate-limiter and other stateful stores.

## Install dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

## Running locally

1. Create a `.env` file in `backend/` with the required environment variables (do NOT commit this file).
2. Start backend in dev mode:

```bash
cd backend
npm run dev
```

3. Start frontend:

```bash
cd frontend
npm start
```

## Production notes

- Use a process manager (PM2, systemd) or container orchestration for the backend.
- Use a managed MongoDB (Atlas) and Redis for production-scale rate limiting.
- Ensure `FRONTEND_URL` is set so verification and reset emails use proper links.
- Use HTTPS and secure your domain with TLS.
- If the frontend and backend are served from different origins, configure `REACT_APP_API_BASE_URL` in `frontend/.env` or through your build pipeline.

## Docker and container deployment

A Docker-based setup is available with `docker-compose.yml` for local or staging deployments.

1. Copy the example env file:

```bash
cp .env.example .env
```

2. Build and start containers:

```bash
docker compose up --build
```

3. The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:4000`.

Use external managed services for MongoDB and Redis in production, and set `MONGO_URI`/`REDIS_URL` accordingly.

## Rate limiting

- The code supports Redis-backed rate limiting when `REDIS_URL` is set. This is recommended for distributed deployments.

## Secrets management

- Do not store secrets in source control. Use environment variables, a secrets manager (AWS Secrets Manager, Azure Key Vault, HashiCorp Vault), or your PaaS provider's secrets features.
- Rotate `SECRET` and API keys periodically.

## Logging and monitoring

- Integrate a centralized logging solution (ELK, Datadog, Papertrail) and monitoring/alerts for errors and high rate-limit events.

## Testing email flows

- Verify that `RESEND_MEETING_MANAGER_API_KEY` and `RESEND_EMAIL` are set.
- Use a non-production email address during testing.

## Rollback plan

- Keep a tested backup of the database and migration plan before production releases.

## Security reminders

- Sanitize user inputs and validate on server side (already implemented for main endpoints).
- Rate limit auth endpoints to avoid brute force attacks (already implemented).
- Enforce HTTPS and strong secrets.

If you want, I can add CI steps or a small `Dockerfile` and `docker-compose.yml` for production-ready deployments.
