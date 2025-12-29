"""
SMS Platform - Database Models
Simple in-memory data models (replace with SQLAlchemy for production)
"""

from datetime import datetime
from typing import List, Dict, Optional

class Message:
    """SMS Message Model"""
    def __init__(self, phone: str, message: str, message_id: int = None):
        self.id = message_id
        self.phone = phone
        self.message = message
        self.timestamp = datetime.now().isoformat()
        self.status = 'sent'
        self.delivery_status = 'pending'
    
    def to_dict(self) -> Dict:
        return {
            'id': self.id,
            'phone': self.phone,
            'message': self.message,
            'timestamp': self.timestamp,
            'status': self.status,
            'delivery_status': self.delivery_status
        }


class Contact:
    """Contact Model"""
    def __init__(self, name: str, phone: str, contact_id: int = None):
        self.id = contact_id
        self.name = name
        self.phone = phone
        self.messages = 0
        self.created_at = datetime.now().isoformat()
        self.tags = []
    
    def to_dict(self) -> Dict:
        return {
            'id': self.id,
            'name': self.name,
            'phone': self.phone,
            'messages': self.messages,
            'created_at': self.created_at,
            'tags': self.tags
        }


class ScheduledMessage:
    """Scheduled Message Model"""
    def __init__(self, phone: str, message: str, scheduled_time: str, msg_id: int = None):
        self.id = msg_id
        self.phone = phone
        self.message = message
        self.scheduled_time = scheduled_time
        self.created_at = datetime.now().isoformat()
        self.status = 'scheduled'
        self.sent_at = None
    
    def to_dict(self) -> Dict:
        return {
            'id': self.id,
            'phone': self.phone,
            'message': self.message,
            'scheduled_time': self.scheduled_time,
            'created_at': self.created_at,
            'status': self.status,
            'sent_at': self.sent_at
        }


class Analytics:
    """Analytics Model"""
    def __init__(self, messages: List[Message], contacts: List[Contact], 
                 scheduled: List[ScheduledMessage]):
        self.total_sent = len(messages)
        self.total_scheduled = len(scheduled)
        self.total_contacts = len(contacts)
        self.delivery_rate = self.calculate_delivery_rate(messages)
        self.active_today = self.calculate_active_today(messages)
    
    def calculate_delivery_rate(self, messages: List[Message]) -> float:
        if not messages:
            return 0.0
        # Mock calculation - in production, check actual delivery status
        delivered = sum(1 for m in messages if hasattr(m, 'delivery_status') 
                       and m.delivery_status == 'delivered')
        return round((delivered / len(messages)) * 100, 2) if messages else 98.5
    
    def calculate_active_today(self, messages: List[Message]) -> int:
        today = datetime.now().date()
        return sum(1 for m in messages 
                  if datetime.fromisoformat(m.timestamp).date() == today)
    
    def to_dict(self) -> Dict:
        return {
            'total_sent': self.total_sent,
            'total_scheduled': self.total_scheduled,
            'total_contacts': self.total_contacts,
            'delivery_rate': self.delivery_rate,
            'active_today': self.active_today
        }
