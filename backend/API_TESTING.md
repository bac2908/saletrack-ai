# SaleTrack AI API Testing

Base URL:

```text
http://localhost:5000
```

Note: Actual database responses include `createdAt` and `updatedAt`. Some samples below are shortened to keep the main fields easy to scan.

Start backend:

```bash
npm run dev
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
  "name": "Nguyen Van A",
  "phone": "0901234567",
  "email": "vana@example.com",
  "status": "ACTIVE"
}
```

Expected response:

```json
{
  "success": true,
  "message": "Sale created successfully",
  "data": {
    "id": 1,
    "name": "Nguyen Van A",
    "phone": "0901234567",
    "email": "vana@example.com",
    "status": "ACTIVE",
    "agencies": []
  }
}
```

## 3. Get Sales

Method: `GET`

URL:

```text
http://localhost:5000/api/sales
```

Expected response:

```json
{
  "success": true,
  "message": "Sales retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Nguyen Van A",
      "phone": "0901234567",
      "email": "vana@example.com",
      "status": "ACTIVE",
      "agencies": []
    }
  ]
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
  "name": "Dai ly Minh Anh",
  "address": "123 Cong Hoa, TP.HCM",
  "area": "TP.HCM",
  "saleId": 1
}
```

Expected response:

```json
{
  "success": true,
  "message": "Agency created successfully",
  "data": {
    "id": 1,
    "name": "Dai ly Minh Anh",
    "address": "123 Cong Hoa, TP.HCM",
    "area": "TP.HCM",
    "saleId": 1,
    "sale": {
      "id": 1,
      "name": "Nguyen Van A"
    }
  }
}
```

## 5. Get Agencies

Method: `GET`

URL:

```text
http://localhost:5000/api/agencies
```

Expected response:

```json
{
  "success": true,
  "message": "Agencies retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Dai ly Minh Anh",
      "address": "123 Cong Hoa, TP.HCM",
      "area": "TP.HCM",
      "saleId": 1,
      "sale": {
        "id": 1,
        "name": "Nguyen Van A"
      }
    }
  ]
}
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
  "customerName": "Khach hang ABC",
  "expectedRevenue": 15000000,
  "status": "POTENTIAL",
  "note": "Khach quan tam, hen goi lai tuan sau",
  "agencyId": 1
}
```

Expected response:

```json
{
  "success": true,
  "message": "Track record created successfully",
  "data": {
    "id": 1,
    "customerName": "Khach hang ABC",
    "expectedRevenue": 15000000,
    "status": "POTENTIAL",
    "note": "Khach quan tam, hen goi lai tuan sau",
    "agencyId": 1,
    "agency": {
      "id": 1,
      "sale": {
        "id": 1,
        "name": "Nguyen Van A"
      }
    }
  }
}
```

## 7. Get TrackRecords

Method: `GET`

URL:

```text
http://localhost:5000/api/track-records
```

Expected response:

```json
{
  "success": true,
  "message": "Track records retrieved successfully",
  "data": [
    {
      "id": 1,
      "customerName": "Khach hang ABC",
      "expectedRevenue": 15000000,
      "status": "POTENTIAL",
      "agency": {
        "id": 1,
        "name": "Dai ly Minh Anh",
        "sale": {
          "id": 1,
          "name": "Nguyen Van A"
        }
      }
    }
  ]
}
```

## 8. Dashboard Stats

Method: `GET`

URL:

```text
http://localhost:5000/api/dashboard/stats
```

Expected response:

```json
{
  "success": true,
  "message": "Dashboard stats retrieved successfully",
  "data": {
    "activeSalesCount": 1,
    "totalAgencies": 1,
    "totalTrackRecords": 1,
    "totalExpectedRevenue": 15000000,
    "trackRecordsByStatus": {
      "NEW": 0,
      "CONTACTED": 0,
      "POTENTIAL": 1,
      "CLOSED": 0,
      "LOST": 0
    }
  }
}
```
