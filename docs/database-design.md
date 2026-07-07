# Database Design

SaleTrack AI uses SQLite with Prisma ORM.

## Main Models

- `Sale`: sales owner information and active/inactive status.
- `Agency`: agency information linked to one sale.
- `TrackRecord`: customer tracking records linked to one agency.

## Relations

- One `Sale` has many `Agency` records.
- One `Agency` belongs to one `Sale`.
- One `Agency` has many `TrackRecord` records.
- One `TrackRecord` belongs to one `Agency`.

See `backend/prisma/schema.prisma` for the source of truth.
