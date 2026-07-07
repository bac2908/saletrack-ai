# SaleTrack AI

SaleTrack AI is a demo sales management app for the flow:

```text
Sale -> Agency -> TrackRecord -> Dashboard stats
```

## Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Database: SQLite
- ORM: Prisma

## Setup

Install dependencies from the project root:

```bash
npm install
```

Prepare backend database:

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
```

Run backend:

```bash
cd backend
npm run dev
```

Run frontend:

```bash
cd frontend
npm run dev
```

Default URLs:

- Frontend: `http://127.0.0.1:5173`
- Backend API: `http://localhost:5000/api`

## Demo Data

The seed file creates Vietnamese demo data:

- 12 sales
- 42 agencies across Vietnamese areas
- 210 track records with mixed statuses

This makes pagination visible on Sales, Agencies, and Track Records pages.

## Main Demo Flow

1. Open Dashboard to view stats.
2. Open Sales Team and create a new sale.
3. Open Agencies and create a new agency assigned to a sale.
4. Open Track Records and create a new record assigned to an agency.
5. Return to Dashboard to see updated totals.
6. Use the edit/delete icon buttons in each table to test CRUD.
7. Use the Light Mode / Dark Mode control in the sidebar or dashboard header to switch theme.

## API Notes

List APIs support pagination and search:

```text
GET /api/sales?page=1&limit=8&search=Nguyễn
GET /api/agencies?page=1&limit=8&search=Hà Nội
GET /api/track-records?page=1&limit=10&search=Công ty
```

CRUD APIs:

```text
GET /api/sales/:id
PUT /api/sales/:id
DELETE /api/sales/:id

GET /api/agencies/:id
PUT /api/agencies/:id
DELETE /api/agencies/:id

GET /api/track-records/:id
PUT /api/track-records/:id
DELETE /api/track-records/:id
```

## Completed

- Prisma schema for Sale, Agency, TrackRecord
- SQLite database and Vietnamese seed data
- Express API with validation and centralized error handling
- Dashboard stats endpoint
- React executive-style UI for 4 pages
- API-backed lists with pagination
- CRUD flow for Sale, Agency, TrackRecord
- Light/dark theme toggle

## Not Included

- Authentication, login, roles
- Advanced reporting/export
