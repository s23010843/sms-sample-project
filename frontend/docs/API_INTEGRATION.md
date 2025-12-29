# SMS Platform API Integration Guide

## Overview

This guide shows how to connect the frontend components to the Flask backend API.

## API Base URL

Development: `http://localhost:5000`
Production: Configure in `.env` file

## Frontend API Service

### Create API Service (TypeScript)

```typescript
// src/services/smsApi.ts
export class SMSApiService {
  private baseUrl = 'http://localhost:5000/api';

  async sendSMS(phone: string, message: string) {
    const response = await fetch(`${this.baseUrl}/sms/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, message })
    });
    return response.json();
  }

  async getContacts() {
    const response = await fetch(`${this.baseUrl}/contacts`);
    return response.json();
  }

  async addContact(name: string, phone: string) {
    const response = await fetch(`${this.baseUrl}/contacts/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone })
    });
    return response.json();
  }

  async scheduleMessage(phone: string, message: string, scheduledTime: string) {
    const response = await fetch(`${this.baseUrl}/sms/schedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, message, scheduled_time: scheduledTime })
    });
    return response.json();
  }

  async getAnalytics() {
    const response = await fetch(`${this.baseUrl}/analytics`);
    return response.json();
  }
}
```

## Vue Component Integration

```vue
<script setup>
import { ref } from 'vue';

const phoneNumber = ref('');
const message = ref('');
const status = ref('');

const sendMessage = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/sms/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: phoneNumber.value,
        message: message.value
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      status.value = 'Message sent successfully!';
      phoneNumber.value = '';
      message.value = '';
    }
  } catch (error) {
    status.value = 'Error sending message';
    console.error(error);
  }
};
</script>
```

## React Component Integration

```jsx
import React, { useState, useEffect } from 'react';

function ContactManagement() {
  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:5000/api/contacts')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setContacts(data.contacts);
        }
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      {contacts.map(contact => (
        <div key={contact.id}>{contact.name}</div>
      ))}
    </div>
  );
}
```

## Angular Component Integration

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-analytics',
  template: `...`
})
export class AnalyticsComponent implements OnInit {
  analytics: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:5000/api/analytics')
      .subscribe(data => {
        if (data.success) {
          this.analytics = data.analytics;
        }
      });
  }
}
```

## Svelte Component Integration

```svelte
<script>
  import { onMount } from 'svelte';
  let scheduledMessages = [];

  onMount(async () => {
    const response = await fetch('http://localhost:5000/api/sms/scheduled');
    const data = await response.json();
    if (data.success) {
      scheduledMessages = data.scheduled_messages;
    }
  });

  async function scheduleMessage(phone, message, time) {
    const response = await fetch('http://localhost:5000/api/sms/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone,
        message,
        scheduled_time: time
      })
    });
    
    const data = await response.json();
    if (data.success) {
      scheduledMessages = [...scheduledMessages, data.data];
    }
  }
</script>
```

## Error Handling

```typescript
async function apiCall(endpoint: string, options = {}) {
  try {
    const response = await fetch(`http://localhost:5000${endpoint}`, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
```

## CORS Configuration

The Flask backend is already configured with CORS support:

```python
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
```

## Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Testing API Endpoints

Use curl or Postman to test:

```bash
# Send SMS
curl -X POST http://localhost:5000/api/sms/send \
  -H "Content-Type: application/json" \
  -d '{"phone": "+1234567890", "message": "Test"}'

# Get Analytics
curl http://localhost:5000/api/analytics
```

## WebSocket Support (Future Enhancement)

For real-time updates, consider adding Socket.IO:

```python
# Backend
from flask_socketio import SocketIO
socketio = SocketIO(app, cors_allowed_origins="*")
```

```javascript
// Frontend
import io from 'socket.io-client';
const socket = io('http://localhost:5000');
socket.on('new_message', (data) => {
  console.log('New message:', data);
});
```
