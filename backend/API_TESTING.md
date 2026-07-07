# SaleTrack AI API Testing

Base URL:

```text
http://localhost:5000
```

Start backend:

```bash
npm run dev
```

Seed Vietnamese demo data:

```bash
npm run prisma:seed
```

## 1. Health Check

Method: `GET`

URL:

```text
http://localhost:5000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "SaleTrack AI backend is running"
}
```

## 2. Create Sale

Method: `POST`

URL:

```text
http://localhost:5000/api/sales
```

Body:

```json
{
  "name": "Nguyễn Văn An",
  "phone": "0901234567",
  "email": "nguyenvanan@example.com",
  "status": "ACTIVE"
}
```

## 3. Get Sales With Pagination

Method: `GET`

URL:

```text
http://localhost:5000/api/sales?page=1&limit=8&search=Nguyễn
```

Expected shape:

```json
{
  "success": true,
  "message": "Sales retrieved successfully",
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 8,
      "total": 12,
      "totalPages": 2,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
  }
}
```

## 4. Create Agency

Method: `POST`

URL:

```text
http://localhost:5000/api/agencies
```

Body:

```json
{
  "name": "Đại lý An Phát",
  "address": "123 Lê Lợi, Quận 1, TP.HCM",
  "area": "TP.HCM",
  "saleId": 1
}
```

## 5. Get Agencies With Pagination

Method: `GET`

URL:

```text
http://localhost:5000/api/agencies?page=1&limit=8&search=TP.HCM
```

## 6. Create TrackRecord

Method: `POST`

URL:

```text
http://localhost:5000/api/track-records
```

Body:

```json
{
  "customerName": "Công ty TNHH Việt Phát",
  "expectedRevenue": 15000000,
  "status": "POTENTIAL",
  "note": "Khách quan tâm, hẹn gọi lại tuần sau",
  "agencyId": 1
}
```

## 7. Get TrackRecords With Pagination

Method: `GET`

URL:

```text
http://localhost:5000/api/track-records?page=1&limit=10&search=Công ty
```

## 8. Dashboard Stats

Method: `GET`

URL:

```text
http://localhost:5000/api/dashboard/stats
```

Expected shape:

```json
{
  "success": true,
  "message": "Dashboard stats retrieved successfully",
  "data": {
    "activeSalesCount": 10,
    "totalAgencies": 42,
    "totalTrackRecords": 210,
    "totalExpectedRevenue": 12000000000,
    "trackRecordsByStatus": {
      "NEW": 42,
      "CONTACTED": 42,
      "POTENTIAL": 42,
      "CLOSED": 42,
      "LOST": 42
    }
  }
}
```

## 9. Update Sale

Method: `PUT`

URL:

```text
http://localhost:5000/api/sales/1
```

Body:

```json
{
  "name": "Nguyễn Văn An Updated",
  "status": "ACTIVE"
}
```

## 10. Update Agency

Method: `PUT`

URL:

```text
http://localhost:5000/api/agencies/1
```

Body:

```json
{
  "name": "Đại lý An Phát Updated",
  "area": "TP.HCM",
  "saleId": 1
}
```

## 11. Update TrackRecord

Method: `PUT`

URL:

```text
http://localhost:5000/api/track-records/1
```

Body:

```json
{
  "status": "CLOSED",
  "expectedRevenue": 25000000,
  "note": "Đã chốt đơn sau cuộc gọi follow-up"
}
```

## 12. Delete Records

TrackRecord:

```text
DELETE http://localhost:5000/api/track-records/1
```

Agency:

```text
DELETE http://localhost:5000/api/agencies/1
```

Sale:

```text
DELETE http://localhost:5000/api/sales/1
```

Note: deleting a Sale also removes its Agencies and related TrackRecords. Deleting an Agency also removes its TrackRecords.
