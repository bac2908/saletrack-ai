# SaleTrack AI

SaleTrack AI is a demo sales-management application implementing the flow:

Sale → Agency → TrackRecord → Dashboard

This repository contains a monorepo with a `frontend` (React + Vite) and `backend` (Node.js + Express + TypeScript) connected by a Prisma + SQLite database.

## Core Workflow

Sale → Agency → TrackRecord → Dashboard


## Data Relationships

- One Sale can manage many Agencies.
- One Agency can have many Track Records.
- Agency is linked to Sale by saleId.
- TrackRecord is linked to Agency by agencyId.

---

## Tech stack

- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Database: SQLite (Prisma ORM)

---

## Quickstart (development)

Prerequisites: Node.js (>=18 recommended), npm.

1. Install dependencies (root):

```bash
npm install
```

2. Prepare the backend database and seed demo data:

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
cd ..
```

3. Run both frontend and backend in development (from repo root):

```bash
npm run dev
```

- Frontend: http://127.0.0.1:5173
- Backend API base: http://localhost:5000/api

Notes:
- Environment samples: `backend/.env.example`, `frontend/.env.example`.

---

## Build & Production (basic)

1. Build frontend:

```bash
cd frontend
npm run build
```

2. Build backend and run:

```bash
cd backend
npm run build
npm start
```

Adjust hosting for frontend preview as needed (Vite preview or static server).

---

## Project scripts

- `npm run dev` (root): run frontend & backend concurrently for development.
- `cd backend && npm run dev`: run TypeScript Express server with `ts-node-dev`.
- `cd frontend && npm run dev`: run Vite dev server.
- `cd backend && npm run prisma:seed`: populate demo Vietnamese data.

---

## Screenshots

The `screenshots/` folder should contain these images for submission:

- `dashboard.png`
- `sales-page.png`
- `agencies-page.png`
- `track-records-page.png`

I provide a small Playwright script in `AI_USAGE.md` to automate screenshot capture. If you need to regenerate screenshots locally, follow the instructions in `AI_USAGE.md` and ensure the dev servers are running.

---

## What I implemented (summary)

- Data models: `Sale`, `Agency`, `TrackRecord` (Prisma schema).
- Seed: Vietnamese demo data (Sales, Agencies, TrackRecords) for pagination and dashboard metrics.
- Backend: REST API with list/search/pagination endpoints and CRUD for all entities; centralized error handling and basic validation.
- Frontend: React pages for Dashboard, Sales, Agencies, Track Records; components, hooks, and services connecting to the API.
- UX: Vietnamese localization of user-facing text (keeping technical terms where appropriate) and a working "Tìm nhanh" (Dashboard quick-search) that queries the API and deep-links to list pages with `?search=`.

---

## Not implemented / Future work

- Authentication / authorization (login, roles)
- Automated tests & CI workflow (recommended: add ESLint, Vitest/Jest, and a GitHub Actions workflow)
- Production hardening (process manager, environment-specific DB, secrets management)

---

## How AI was used

I used a coding assistant to accelerate schema design, generate code snippets (API scaffolding, React components), plan UI localization, and prepare documentation. See `AI_USAGE.md` for a full record of prompts used, what the AI helped with, and any manual fixes applied.

---

## Contact / notes

If you need me to (A) commit and open a PR with documentation changes, (B) run screenshot capture on this environment (requires running servers + Playwright), or (C) add lint/tests/CI — tell me which and I will proceed.

---

## Candidate notes for reviewers

This submission implements the requested CRUD and Dashboard flows and includes UI localization and a working quick-search. The candidate should be prepared to explain the requirement analysis, data-model decisions, how AI was used (prompts and scope), bugs encountered and how they were fixed, and proposed improvements if more time is available. Full details and prompt history are recorded in `AI_USAGE.md`.

