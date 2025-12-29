from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json

# Import local modules
from config import get_config
from models import Message, Contact, ScheduledMessage, Analytics
from utils import (
    validate_phone_number, 
    validate_message_content,
    format_phone_number,
    calculate_message_segments,
    estimate_cost,
    parse_scheduled_time,
    sanitize_input
)

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(get_config())
CORS(app, origins=app.config['CORS_ORIGINS'])

# In-memory storage (replace with database in production)
messages = []
contacts = [
    {'id': 1, 'name': 'John Doe', 'phone': '+1 234 567 8901', 'messages': 45},
    {'id': 2, 'name': 'Jane Smith', 'phone': '+1 234 567 8902', 'messages': 32},
    {'id': 3, 'name': 'Bob Johnson', 'phone': '+1 234 567 8903', 'messages': 28},
]
scheduled_messages = []

@app.route('/')
def home():
    return jsonify({
        'message': 'SMS Platform API',
        'version': '1.0.0',
        'endpoints': {
            'send_sms': '/api/sms/send',
            'get_messages': '/api/sms/messages',
            'get_contacts': '/api/contacts',
            'add_contact': '/api/contacts/add',
            'schedule_message': '/api/sms/schedule',
            'get_scheduled': '/api/sms/scheduled',
            'analytics': '/api/analytics'
        }
    })

@app.route('/api/sms/send', methods=['POST'])
def send_sms():
    """Send an SMS message"""
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    phone = data.get('phone', '')
    message_text = data.get('message', '')
    
    # Validate phone number
    is_valid_phone, phone_error = validate_phone_number(phone)
    if not is_valid_phone:
        return jsonify({'error': phone_error}), 400
    
    # Validate message content
    is_valid_message, message_error = validate_message_content(message_text)
    if not is_valid_message:
        return jsonify({'error': message_error}), 400
    
    # Format and sanitize
    phone = format_phone_number(phone)
    message_text = sanitize_input(message_text)
    
    # Create message object
    msg = Message(
        phone=phone,
        message=message_text,
        message_id=len(messages) + 1
    )
    
    messages.append(msg)
    
    # Calculate segments and cost
    segments = calculate_message_segments(message_text)
    cost = estimate_cost(message_text)
    
    return jsonify({
        'success': True,
        'message': 'SMS sent successfully',
        'data': {
            **msg.to_dict(),
            'segments': segments,
            'estimated_cost': cost
        }
    }), 200

@app.route('/api/sms/messages', methods=['GET'])
def get_messages():
    """Get all sent messages with pagination"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    
    # Limit per_page
    per_page = min(per_page, 100)
    
    # Calculate pagination
    start = (page - 1) * per_page
    end = start + per_page
    
    paginated_messages = messages[start:end]
    
    return jsonify({
        'success': True,
        'count': len(messages),
        'page': page,
        'per_page': per_page,
        'total_pages': (len(messages) + per_page - 1) // per_page,
        'messages': [msg.to_dict() if hasattr(msg, 'to_dict') else msg for msg in paginated_messages]
    }), 200

@app.route('/api/contacts', methods=['GET'])
def get_contacts():
    """Get all contacts with search"""
    search = request.args.get('search', '').lower()
    
    filtered_contacts = contacts
    if search:
        filtered_contacts = [
            c for c in contacts 
            if search in c.get('name', '').lower() or search in c.get('phone', '')
        ]
    
    return jsonify({
        'success': True,
        'count': len(filtered_contacts),
        'total': len(contacts),
        'contacts': filtered_contacts
    }), 200

@app.route('/api/contacts/add', methods=['POST'])
def add_contact():
    """Add a new contact"""
    data = request.get_json()
    
    if not data or 'name' not in data or 'phone' not in data:
        return jsonify({'error': 'Name and phone number are required'}), 400
    
    name = sanitize_input(data['name'])
    phone = data['phone']
    
    # Validate phone number
    is_valid_phone, phone_error = validate_phone_number(phone)
    if not is_valid_phone:
        return jsonify({'error': phone_error}), 400
    
    # Check for duplicate
    phone_formatted = format_phone_number(phone)
    for existing in contacts:
        if existing.get('phone') == phone_formatted:
            return jsonify({'error': 'Contact with this phone number already exists'}), 409
    
    contact = {
        'id': len(contacts) + 1,
        'name': name,
        'phone': phone_formatted,
        'messages': 0,
        'created_at': datetime.now().isoformat(),
        'tags': data.get('tags', [])
    }
    
    contacts.append(contact)
    
    return jsonify({
        'success': True,
        'message': 'Contact added successfully',
        'contact': contact
    }), 201

@app.route('/api/sms/schedule', methods=['POST'])
def schedule_message():
    """Schedule a message for later delivery"""
    data = request.get_json()
    
    required_fields = ['phone', 'message', 'scheduled_time']
    if not data or not all(field in data for field in required_fields):
        return jsonify({'error': 'Phone, message, and scheduled_time are required'}), 400
    
    phone = data['phone']
    message_text = data['message']
    scheduled_time = data['scheduled_time']
    
    # Validate phone number
    is_valid_phone, phone_error = validate_phone_number(phone)
    if not is_valid_phone:
        return jsonify({'error': phone_error}), 400
    
    # Validate message
    is_valid_message, message_error = validate_message_content(message_text)
    if not is_valid_message:
        return jsonify({'error': message_error}), 400
    
    # Validate scheduled time
    is_valid_time, time_error = parse_scheduled_time(scheduled_time)
    if not is_valid_time:
        return jsonify({'error': time_error}), 400
    
    phone = format_phone_number(phone)
    message_text = sanitize_input(message_text)
    
    scheduled_entry = {
        'id': len(scheduled_messages) + 1,
        'phone': phone,
        'message': message_text,
        'scheduled_time': scheduled_time,
        'created_at': datetime.now().isoformat(),
        'status': 'scheduled'
    }
    
    scheduled_messages.append(scheduled_entry)
    
    return jsonify({
        'success': True,
        'message': 'Message scheduled successfully',
        'data': scheduled_entry
    }), 201

@app.route('/api/sms/scheduled', methods=['GET'])
def get_scheduled():
    """Get all scheduled messages"""
    return jsonify({
        'success': True,
        'count': len(scheduled_messages),
        'scheduled_messages': scheduled_messages
    }), 200

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    """Get SMS analytics"""
    total_sent = len(messages)
    total_scheduled = len(scheduled_messages)
    total_contacts = len(contacts)
    
    # Calculate delivery rate (mock data)
    delivery_rate = 98.5 if total_sent > 0 else 0
    
    return jsonify({
        'success': True,
        'analytics': {
            'total_sent': total_sent,
            'total_scheduled': total_scheduled,
            'total_contacts': total_contacts,
            'delivery_rate': delivery_rate,
            'active_today': total_sent
        }
    }), 200

if __name__ == '__main__':
    print('🚀 SMS Platform API Server')
    print('📱 Endpoints available at http://localhost:5000')
    app.run(debug=True, host='0.0.0.0', port=5000)