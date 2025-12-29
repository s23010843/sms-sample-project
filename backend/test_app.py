"""
SMS Platform API Tests
Run with: pytest test_app.py
"""

import pytest
import json
from app import app

@pytest.fixture
def client():
    """Test client fixture"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


def test_home_endpoint(client):
    """Test home endpoint"""
    response = client.get('/')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'message' in data
    assert data['message'] == 'SMS Platform API'


def test_send_sms_success(client):
    """Test successful SMS sending"""
    payload = {
        'phone': '+1234567890',
        'message': 'Test message'
    }
    response = client.post('/api/sms/send',
                          data=json.dumps(payload),
                          content_type='application/json')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['success'] == True
    assert 'data' in data


def test_send_sms_invalid_phone(client):
    """Test SMS sending with invalid phone"""
    payload = {
        'phone': 'invalid',
        'message': 'Test message'
    }
    response = client.post('/api/sms/send',
                          data=json.dumps(payload),
                          content_type='application/json')
    assert response.status_code == 400
    data = json.loads(response.data)
    assert 'error' in data


def test_send_sms_empty_message(client):
    """Test SMS sending with empty message"""
    payload = {
        'phone': '+1234567890',
        'message': ''
    }
    response = client.post('/api/sms/send',
                          data=json.dumps(payload),
                          content_type='application/json')
    assert response.status_code == 400


def test_get_messages(client):
    """Test getting messages"""
    response = client.get('/api/sms/messages')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'messages' in data
    assert 'count' in data


def test_get_contacts(client):
    """Test getting contacts"""
    response = client.get('/api/contacts')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'contacts' in data


def test_add_contact_success(client):
    """Test adding a contact"""
    payload = {
        'name': 'Test User',
        'phone': '+19876543210'
    }
    response = client.post('/api/contacts/add',
                          data=json.dumps(payload),
                          content_type='application/json')
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['success'] == True


def test_add_contact_missing_data(client):
    """Test adding contact with missing data"""
    payload = {
        'name': 'Test User'
    }
    response = client.post('/api/contacts/add',
                          data=json.dumps(payload),
                          content_type='application/json')
    assert response.status_code == 400


def test_schedule_message_success(client):
    """Test scheduling a message"""
    payload = {
        'phone': '+1234567890',
        'message': 'Scheduled test',
        'scheduled_time': '2026-01-01T10:00:00'
    }
    response = client.post('/api/sms/schedule',
                          data=json.dumps(payload),
                          content_type='application/json')
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['success'] == True


def test_schedule_message_past_time(client):
    """Test scheduling with past time"""
    payload = {
        'phone': '+1234567890',
        'message': 'Scheduled test',
        'scheduled_time': '2020-01-01T10:00:00'
    }
    response = client.post('/api/sms/schedule',
                          data=json.dumps(payload),
                          content_type='application/json')
    assert response.status_code == 400


def test_get_scheduled_messages(client):
    """Test getting scheduled messages"""
    response = client.get('/api/sms/scheduled')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'scheduled_messages' in data


def test_get_analytics(client):
    """Test analytics endpoint"""
    response = client.get('/api/analytics')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'analytics' in data
    assert 'total_sent' in data['analytics']
    assert 'delivery_rate' in data['analytics']


def test_search_contacts(client):
    """Test contact search"""
    response = client.get('/api/contacts?search=john')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'contacts' in data


def test_pagination(client):
    """Test message pagination"""
    response = client.get('/api/sms/messages?page=1&per_page=5')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'page' in data
    assert 'per_page' in data
    assert data['page'] == 1
    assert data['per_page'] == 5


if __name__ == '__main__':
    pytest.main([__file__, '-v'])
