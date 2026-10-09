# Backend

## Setup

From this directory, install dependencies and create a local environment file:

```sh
npm install
cp .env.example .env
```

On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.
Set `MONGODB_DEV_URI` to a reachable MongoDB connection string and replace
`JWT_SECRET` with a long, random secret. Keep `.env` out of version control.

## Run

```sh
npm run dev
```

The API listens on port `5000` by default. Authentication endpoints are
`POST /api/auth/signup`, `POST /api/auth/signin`, and
`GET /api/auth/home` (requires a Bearer token).
