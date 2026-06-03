# Release Checklist

This checklist summarizes the key production readiness items for Meeting Manager.

## ✅ Completed

- [x] Backend auth routes protected and ownership enforced
- [x] Server-side validation and sanitization added for auth and time-off/session endpoints
- [x] Rate limiting added to auth endpoints with optional Redis-backed store
- [x] Sensitive environment variables hidden from logs; centralized backend logger implemented
- [x] Production email links use `FRONTEND_URL` and fallback behavior is logged safely
- [x] Backend password reset flow and auth flow verified with Jest tests
- [x] Backend dependencies audited and pinned to secure versions
- [x] Deployment documentation added in `DEPLOY.md`
- [x] Docker support added for backend, frontend, MongoDB, and Redis
- [x] GitHub Actions CI workflow added for backend tests and frontend build
- [x] Frontend API client centralized and uses build-time `REACT_APP_API_BASE_URL`
- [x] UX patterns and fetch handling were improved for account creation, login, and password reset

## 🔎 Release verification

- [ ] Run backend tests
  - `cd backend && npm test`
- [ ] Build frontend
  - `cd frontend && npm run build`
- [ ] Run audit checks
  - `cd backend && npm audit`
  - `cd frontend && npm audit`
- [ ] Validate Docker deployment locally
  - `cp .env.example .env`
  - `docker compose up --build`
- [ ] Confirm backend and frontend endpoints work through local containers

## 🧩 Environment variables

Required values for production deployment:

- `MONGO_URI`
- `PORT`
- `SECRET`
- `RESEND_MEETING_MANAGER_API_KEY`
- `RESEND_EMAIL`
- `FRONTEND_URL`
  Optional but recommended:
- `REDIS_URL`

## 🚀 Deployment notes

- Use HTTPS and managed MongoDB/Redis for production
- Use a process manager (PM2, systemd) or container orchestration for the backend
- Keep secrets out of source control and rotate periodically
- Ensure `FRONTEND_URL` is set so verification/reset emails use correct links
- Use centralized logging and monitoring for production errors and rate-limit events

## 📌 Final checks before shipping

- [ ] Confirm `npm test` passes in `backend`
- [ ] Confirm frontend build succeeds
- [ ] Confirm CI workflow is configured on the target repo
- [ ] Confirm Docker-based local deployment works if using containers
- [ ] Confirm production env vars are configured securely

If you want, I can also add a short `CHANGELOG.md` template for release notes.
