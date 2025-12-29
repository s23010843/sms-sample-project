"""
SMS Platform - Utility Functions
Helper functions for validation, formatting, and processing
"""

import re
from datetime import datetime
from typing import Optional, Tuple

def validate_phone_number(phone: str) -> Tuple[bool, Optional[str]]:
    """
    Validate phone number format
    Returns: (is_valid, error_message)
    """
    if not phone:
        return False, "Phone number is required"
    
    # Remove all non-digit characters except +
    cleaned = re.sub(r'[^\d+]', '', phone)
    
    # Check if it starts with + and has 10-15 digits
    if not re.match(r'^\+\d{10,15}$', cleaned):
        return False, "Phone number must be in format: +1234567890 (10-15 digits)"
    
    return True, None


def validate_message_content(message: str) -> Tuple[bool, Optional[str]]:
    """
    Validate message content
    Returns: (is_valid, error_message)
    """
    if not message:
        return False, "Message content is required"
    
    if len(message) > 1600:
        return False, "Message too long (max 1600 characters)"
    
    if len(message.strip()) == 0:
        return False, "Message cannot be empty"
    
    return True, None


def format_phone_number(phone: str) -> str:
    """
    Format phone number to standard format
    """
    # Remove all non-digit characters except +
    cleaned = re.sub(r'[^\d+]', '', phone)
    return cleaned


def calculate_message_segments(message: str) -> int:
    """
    Calculate how many SMS segments are needed for the message
    Standard SMS: 160 characters per segment
    Unicode SMS: 70 characters per segment
    """
    # Check if message contains unicode characters
    try:
        message.encode('ascii')
        is_unicode = False
    except UnicodeEncodeError:
        is_unicode = True
    
    segment_length = 70 if is_unicode else 160
    message_length = len(message)
    
    if message_length == 0:
        return 0
    
    return (message_length + segment_length - 1) // segment_length


def estimate_cost(message: str, recipient_count: int = 1) -> float:
    """
    Estimate the cost of sending a message
    (Mock pricing: $0.01 per segment per recipient)
    """
    segments = calculate_message_segments(message)
    cost_per_segment = 0.01
    return segments * recipient_count * cost_per_segment


def parse_scheduled_time(scheduled_time: str) -> Tuple[bool, Optional[str]]:
    """
    Validate and parse scheduled time
    Returns: (is_valid, error_message)
    """
    if not scheduled_time:
        return False, "Scheduled time is required"
    
    try:
        scheduled_dt = datetime.fromisoformat(scheduled_time.replace('Z', '+00:00'))
        now = datetime.now()
        
        if scheduled_dt <= now:
            return False, "Scheduled time must be in the future"
        
        return True, None
    except ValueError:
        return False, "Invalid date format. Use ISO format: YYYY-MM-DDTHH:MM:SS"


def sanitize_input(text: str) -> str:
    """
    Sanitize user input to prevent injection attacks
    """
    if not text:
        return ""
    
    # Remove any potentially harmful characters
    sanitized = text.strip()
    
    # Remove control characters
    sanitized = ''.join(char for char in sanitized if ord(char) >= 32 or char == '\n')
    
    return sanitized


def generate_message_id() -> str:
    """
    Generate a unique message ID
    """
    from uuid import uuid4
    return str(uuid4())


def format_timestamp(timestamp: str) -> str:
    """
    Format ISO timestamp to human-readable format
    """
    try:
        dt = datetime.fromisoformat(timestamp)
        return dt.strftime("%Y-%m-%d %H:%M:%S")
    except:
        return timestamp


def mask_phone_number(phone: str) -> str:
    """
    Mask phone number for privacy (e.g., +1234***890)
    """
    if len(phone) < 8:
        return phone
    
    return phone[:5] + '***' + phone[-3:]


def get_time_ago(timestamp: str) -> str:
    """
    Convert timestamp to relative time (e.g., "2 hours ago")
    """
    try:
        dt = datetime.fromisoformat(timestamp)
        now = datetime.now()
        diff = now - dt
        
        seconds = diff.total_seconds()
        
        if seconds < 60:
            return "just now"
        elif seconds < 3600:
            minutes = int(seconds / 60)
            return f"{minutes} minute{'s' if minutes != 1 else ''} ago"
        elif seconds < 86400:
            hours = int(seconds / 3600)
            return f"{hours} hour{'s' if hours != 1 else ''} ago"
        else:
            days = int(seconds / 86400)
            return f"{days} day{'s' if days != 1 else ''} ago"
    except:
        return "unknown"
