# SMS Platform API Documentation

## Base URL
```
http://localhost:5000
```

## Endpoints

### 1. Get API Info
**GET** `/`

Returns basic API information and available endpoints.

**Response:**
```json
{
  "message": "SMS Platform API",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

---

### 2. Send SMS
**POST** `/api/sms/send`

Send an SMS message immediately.

**Request Body:**
```json
{
  "phone": "+1 234 567 8900",
  "message": "Hello, this is a test message!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "SMS sent successfully",
  "data": {
    "id": 1,
    "phone": "+1 234 567 8900",
    "message": "Hello, this is a test message!",
    "timestamp": "2025-12-29T10:30:00",
    "status": "sent"
  }
}
```

---

### 3. Get All Messages
**GET** `/api/sms/messages`

Retrieve all sent messages.

**Response:**
```json
{
  "success": true,
  "count": 10,
  "messages": [ ... ]
}
```

---

### 4. Get Contacts
**GET** `/api/contacts`

Get all contacts in the system.

**Response:**
```json
{
  "success": true,
  "count": 3,
  "contacts": [
    {
      "id": 1,
      "name": "John Doe",
      "phone": "+1 234 567 8901",
      "messages": 45
    }
  ]
}
```

---

### 5. Add Contact
**POST** `/api/contacts/add`

Add a new contact to the system.

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "+1 234 567 8900"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact added successfully",
  "contact": { ... }
}
```

---

### 6. Schedule Message
**POST** `/api/sms/schedule`

Schedule an SMS message for later delivery.

**Request Body:**
```json
{
  "phone": "+1 234 567 8900",
  "message": "Scheduled message",
  "scheduled_time": "2025-12-30T10:00:00"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message scheduled successfully",
  "data": { ... }
}
```

---

### 7. Get Scheduled Messages
**GET** `/api/sms/scheduled`

Retrieve all scheduled messages.

**Response:**
```json
{
  "success": true,
  "count": 5,
  "scheduled_messages": [ ... ]
}
```

---

### 8. Get Analytics
**GET** `/api/analytics`

Get SMS analytics and statistics.

**Response:**
```json
{
  "success": true,
  "analytics": {
    "total_sent": 1247,
    "total_scheduled": 15,
    "total_contacts": 456,
    "delivery_rate": 98.5,
    "active_today": 150
  }
}
```

---

## Error Responses

All endpoints return error responses in the following format:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

## CORS

The API supports Cross-Origin Resource Sharing (CORS) and can be accessed from any origin.

---

## Running the API

### Development Mode
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Production Mode (Docker)
```bash
cd backend
docker build -t sms-api .
docker run -p 5000:5000 sms-api
```
