import React, { useState } from 'react';

export default function ReactWelcome() {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', phone: '+1 234 567 8901', messages: 45, status: 'active', avatar: '👨' },
    { id: 2, name: 'Jane Smith', phone: '+1 234 567 8902', messages: 32, status: 'active', avatar: '👩' },
    { id: 3, name: 'Bob Johnson', phone: '+1 234 567 8903', messages: 28, status: 'inactive', avatar: '👤' },
    { id: 4, name: 'Alice Williams', phone: '+1 234 567 8904', messages: 56, status: 'active', avatar: '👱‍♀️' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, {
        id: contacts.length + 1,
        ...newContact,
        messages: 0,
        status: 'active',
        avatar: '👤'
      }]);
      setNewContact({ name: '', phone: '' });
      setShowAddForm(false);
    }
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
    setSelectedContact(null);
  };

  return (
    <div className="contact-manager">
      <style>{`
        .contact-manager {
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .icon-wrapper {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
        }

        .header-icon {
          width: 32px;
          height: 32px;
          color: white;
        }

        .title {
          font-size: 1.875rem;
          font-weight: 800;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }

        .subtitle {
          color: #6b7280;
          font-size: 0.875rem;
          margin: 0.25rem 0 0 0;
        }

        .controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .search-wrapper {
          flex: 1;
          min-width: 250px;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          color: #9ca3af;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .add-button {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .add-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        .stats-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          border-radius: 12px;
        }

        .stat-item {
          flex: 1;
          text-align: center;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: #1e40af;
        }

        .stat-label {
          font-size: 0.75rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .contacts-grid {
          display: grid;
          gap: 1rem;
          max-height: 500px;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .contacts-grid::-webkit-scrollbar {
          width: 6px;
        }

        .contacts-grid::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 10px;
        }

        .contacts-grid::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 10px;
        }

        .contact-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .contact-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          transform: scaleY(0);
          transition: transform 0.3s ease;
        }

        .contact-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
          transform: translateX(4px);
        }

        .contact-card:hover::before {
          transform: scaleY(1);
        }

        .contact-card.selected {
          border-color: #3b82f6;
          background: #eff6ff;
        }

        .contact-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
        }

        .contact-details {
          flex: 1;
        }

        .contact-name {
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 0.25rem 0;
          font-size: 1rem;
        }

        .contact-phone {
          color: #6b7280;
          font-size: 0.875rem;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          margin-left: 0.5rem;
        }

        .status-badge.active {
          background: #d1fae5;
          color: #065f46;
        }

        .status-badge.inactive {
          background: #fee2e2;
          color: #991b1b;
        }

        .contact-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
        }

        .message-count {
          font-size: 0.75rem;
          color: #6b7280;
          font-weight: 600;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
        }

        .btn-primary:hover {
          background: #2563eb;
          transform: scale(1.05);
        }

        .btn-danger {
          background: #ef4444;
          color: white;
        }

        .btn-danger:hover {
          background: #dc2626;
          transform: scale(1.05);
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 1.5rem 0;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .modal-actions button {
          flex: 1;
          padding: 0.75rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: #9ca3af;
        }

        .empty-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1rem;
          color: #d1d5db;
        }
      `}</style>

      <div className="header-section">
        <div className="icon-wrapper">
          <svg className="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h2 className="title">Contact Management</h2>
          <p className="subtitle">Organize and manage your SMS contacts</p>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-value">{contacts.length}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{contacts.filter(c => c.status === 'active').length}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{contacts.reduce((sum, c) => sum + c.messages, 0)}</div>
          <div className="stat-label">Messages</div>
        </div>
      </div>

      <div className="controls">
        <div className="search-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search contacts by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button className="add-button" onClick={() => setShowAddForm(true)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Add Contact
        </button>
      </div>

      <div className="contacts-grid">
        {filteredContacts.map(contact => (
          <div 
            key={contact.id} 
            className={`contact-card ${selectedContact?.id === contact.id ? 'selected' : ''}`}
            onClick={() => setSelectedContact(contact)}
          >
            <div className="contact-info">
              <div className="avatar">{contact.avatar}</div>
              <div className="contact-details">
                <h3 className="contact-name">
                  {contact.name}
                  <span className={`status-badge ${contact.status}`}>{contact.status}</span>
                </h3>
                <p className="contact-phone">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  {contact.phone}
                </p>
              </div>
            </div>
            <div className="contact-actions">
              <div className="message-count">📨 {contact.messages} messages</div>
              <div className="action-buttons">
                <button className="action-btn btn-primary">Send SMS</button>
                <button className="action-btn btn-danger" onClick={(e) => { e.stopPropagation(); deleteContact(contact.id); }}>Delete</button>
              </div>
            </div>
          </div>
        ))}

        {filteredContacts.length === 0 && (
          <div className="empty-state">
            <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>No contacts found</p>
            <p style={{ fontSize: '0.875rem' }}>Try adjusting your search or add a new contact</p>
          </div>
        )}
      </div>

      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Add New Contact</h3>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter contact name"
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-input"
                placeholder="+1 234 567 8900"
                value={newContact.phone}
                onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
              />
            </div>
            <div className="modal-actions">
              <button 
                style={{ background: '#e5e7eb', color: '#374151' }}
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
              <button 
                style={{ background: '#3b82f6', color: 'white' }}
                onClick={addContact}
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}