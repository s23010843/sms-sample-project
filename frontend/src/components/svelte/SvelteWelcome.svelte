<script>
  import { writable } from 'svelte/store';
  
  let scheduledMessages = writable([
    { id: 1, recipient: '+1 234 567 8901', name: 'John Doe', message: 'Meeting reminder for tomorrow at 10 AM', time: '10:00 AM', date: '2025-12-30', status: 'pending' },
    { id: 2, recipient: '+1 234 567 8902', name: 'Jane Smith', message: 'Happy Birthday! Wishing you all the best', time: '09:00 AM', date: '2025-12-31', status: 'pending' },
    { id: 3, recipient: '+1 234 567 8903', name: 'Bob Johnson', message: 'Appointment confirmation for dental checkup', time: '02:00 PM', date: '2026-01-02', status: 'scheduled' },
  ]);

  let newMessage = {
    recipient: '',
    name: '',
    message: '',
    time: '',
    date: ''
  };

  let showForm = false;
  let editingId = null;

  function scheduleMessage() {
    if (newMessage.recipient && newMessage.message && newMessage.time && newMessage.date) {
      scheduledMessages.update(messages => [
        ...messages,
        { 
          ...newMessage, 
          id: Date.now(),
          status: 'pending'
        }
      ]);
      resetForm();
    }
  }

  function resetForm() {
    newMessage = { recipient: '', name: '', message: '', time: '', date: '' };
    showForm = false;
    editingId = null;
  }

  function removeMessage(id) {
    scheduledMessages.update(messages => messages.filter(m => m.id !== id));
  }

  function editMessage(message) {
    newMessage = { ...message };
    editingId = message.id;
    showForm = true;
  }

  function getStatusColor(status) {
    return status === 'pending' ? '#f59e0b' : status === 'scheduled' ? '#3b82f6' : '#10b981';
  }

  function getStatusLabel(status) {
    return status === 'pending' ? 'Pending' : status === 'scheduled' ? 'Scheduled' : 'Sent';
  }
</script>

<div class="scheduler">
  <div class="header-section">
    <div class="icon-wrapper">
      <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="header-content">
      <h2>Schedule SMS Messages</h2>
      <p class="subtitle">Plan and automate your messages</p>
    </div>
  </div>

  <div class="stats-row">
    <div class="stat-box">
      <span class="stat-icon">📅</span>
      <div>
        <div class="stat-value">{$scheduledMessages.length}</div>
        <div class="stat-label">Scheduled</div>
      </div>
    </div>
    <div class="stat-box">
      <span class="stat-icon">⏳</span>
      <div>
        <div class="stat-value">{$scheduledMessages.filter(m => m.status === 'pending').length}</div>
        <div class="stat-label">Pending</div>
      </div>
    </div>
    <div class="stat-box">
      <span class="stat-icon">✅</span>
      <div>
        <div class="stat-value">{$scheduledMessages.filter(m => m.status === 'sent').length}</div>
        <div class="stat-label">Completed</div>
      </div>
    </div>
  </div>

  <button class="new-message-btn" on:click={() => showForm = !showForm}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 4v16m8-8H4" stroke-width="2" stroke-linecap="round"/>
    </svg>
    {showForm ? 'Cancel' : 'Schedule New Message'}
  </button>

  {#if showForm}
    <div class="form-card">
      <h3 class="form-title">
        {editingId ? 'Edit Scheduled Message' : 'New Scheduled Message'}
      </h3>
      <div class="form-grid">
        <div class="input-group full-width">
          <label class="label">
            <svg class="label-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke-width="2"/>
            </svg>
            Contact Name
          </label>
          <input
            bind:value={newMessage.name}
            type="text"
            placeholder="John Doe"
            class="input"
          />
        </div>
        
        <div class="input-group full-width">
          <label class="label">
            <svg class="label-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke-width="2"/>
            </svg>
            Phone Number
          </label>
          <input
            bind:value={newMessage.recipient}
            type="tel"
            placeholder="+1 234 567 8900"
            class="input"
          />
        </div>

        <div class="input-group">
          <label class="label">
            <svg class="label-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-width="2"/>
            </svg>
            Date
          </label>
          <input
            bind:value={newMessage.date}
            type="date"
            class="input"
          />
        </div>

        <div class="input-group">
          <label class="label">
            <svg class="label-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2"/>
            </svg>
            Time
          </label>
          <input
            bind:value={newMessage.time}
            type="time"
            class="input"
          />
        </div>

        <div class="input-group full-width">
          <label class="label">
            <svg class="label-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" stroke-width="2"/>
            </svg>
            Message
          </label>
          <textarea
            bind:value={newMessage.message}
            placeholder="Type your message here..."
            rows="4"
            class="textarea"
          ></textarea>
          <div class="char-count">{newMessage.message.length} / 160</div>
        </div>
      </div>

      <div class="form-actions">
        <button class="btn btn-secondary" on:click={resetForm}>Cancel</button>
        <button class="btn btn-primary" on:click={scheduleMessage}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 13l4 4L19 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {editingId ? 'Update' : 'Schedule'} Message
        </button>
      </div>
    </div>
  {/if}

  <div class="messages-section">
    <h3 class="section-title">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-width="2"/>
      </svg>
      Scheduled Messages ({$scheduledMessages.length})
    </h3>
    
    {#if $scheduledMessages.length === 0}
      <div class="empty-state">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-width="2"/>
        </svg>
        <p class="empty-title">No scheduled messages</p>
        <p class="empty-subtitle">Schedule your first message to get started</p>
      </div>
    {:else}
      <div class="messages-grid">
        {#each $scheduledMessages as msg, index}
          <div class="message-card" style="animation-delay: {index * 0.1}s">
            <div class="card-header">
              <div class="contact-info">
                <div class="avatar">{msg.name ? msg.name.charAt(0).toUpperCase() : '?'}</div>
                <div>
                  <h4 class="contact-name">{msg.name || 'Unknown'}</h4>
                  <p class="contact-phone">{msg.recipient}</p>
                </div>
              </div>
              <span class="status-badge" style="background-color: {getStatusColor(msg.status)}20; color: {getStatusColor(msg.status)}">
                {getStatusLabel(msg.status)}
              </span>
            </div>
            
            <div class="card-body">
              <p class="message-text">{msg.message}</p>
            </div>

            <div class="card-footer">
              <div class="schedule-info">
                <span class="schedule-date">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  {msg.date}
                </span>
                <span class="schedule-time">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {msg.time}
                </span>
              </div>
              <div class="card-actions">
                <button class="icon-btn edit" on:click={() => editMessage(msg)} title="Edit">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke-width="2"/>
                  </svg>
                </button>
                <button class="icon-btn delete" on:click={() => removeMessage(msg.id)} title="Delete">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .scheduler {
    animation: fadeIn 0.6s ease-out;
  }

  @keyframes fadeIn {
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
    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 16px rgba(249, 115, 22, 0.3);
  }

  .header-icon {
    width: 32px;
    height: 32px;
    color: white;
  }

  .header-content h2 {
    font-size: 1.875rem;
    font-weight: 800;
    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
  }

  .subtitle {
    color: #6b7280;
    font-size: 0.875rem;
    margin: 0.25rem 0 0 0;
  }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .stat-box {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    background: white;
    border: 2px solid #f3f4f6;
    border-radius: 12px;
    transition: all 0.3s ease;
  }

  .stat-box:hover {
    border-color: #f97316;
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.15);
    transform: translateY(-2px);
  }

  .stat-icon {
    font-size: 2rem;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: 800;
    color: #1f2937;
  }

  .stat-label {
    font-size: 0.75rem;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .new-message-btn {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
    color: white;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
    margin-bottom: 2rem;
  }

  .new-message-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
  }

  .form-card {
    background: white;
    border: 2px solid #f3f4f6;
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 2rem;
    animation: slideDown 0.3s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .form-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 1.5rem 0;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .input-group.full-width {
    grid-column: 1 / -1;
  }

  .label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
  }

  .label-icon {
    color: #f97316;
  }

  .input,
  .textarea {
    width: 100%;
    padding: 0.875rem;
    border: 2px solid #e5e7eb;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;
    font-family: inherit;
  }

  .input:focus,
  .textarea:focus {
    outline: none;
    border-color: #f97316;
    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
  }

  .textarea {
    resize: vertical;
    min-height: 100px;
  }

  .char-count {
    font-size: 0.75rem;
    color: #9ca3af;
    text-align: right;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .btn {
    flex: 1;
    padding: 0.875rem;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .btn-primary {
    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
  }

  .btn-secondary {
    background: #f3f4f6;
    color: #6b7280;
  }

  .btn-secondary:hover {
    background: #e5e7eb;
    color: #374151;
  }

  .messages-section {
    margin-top: 2rem;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1.5rem;
  }

  .messages-grid {
    display: grid;
    gap: 1.5rem;
  }

  .message-card {
    background: white;
    border: 2px solid #f3f4f6;
    border-radius: 16px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    animation: slideIn 0.5s ease-out backwards;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .message-card:hover {
    border-color: #f97316;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .contact-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .avatar {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.25rem;
    color: #9a3412;
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
  }

  .status-badge {
    padding: 0.375rem 0.875rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .card-body {
    margin-bottom: 1rem;
  }

  .message-text {
    color: #374151;
    line-height: 1.6;
    margin: 0;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 2px solid #f3f4f6;
  }

  .schedule-info {
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
    color: #6b7280;
  }

  .schedule-date,
  .schedule-time {
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }

  .card-actions {
    display: flex;
    gap: 0.5rem;
  }

  .icon-btn {
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .icon-btn.edit {
    background: #dbeafe;
    color: #1e40af;
  }

  .icon-btn.edit:hover {
    background: #3b82f6;
    color: white;
    transform: scale(1.1);
  }

  .icon-btn.delete {
    background: #fee2e2;
    color: #991b1b;
  }

  .icon-btn.delete:hover {
    background: #ef4444;
    color: white;
    transform: scale(1.1);
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    background: #fafafa;
    border-radius: 16px;
  }

  .empty-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 1rem;
    color: #d1d5db;
  }

  .empty-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 0.5rem 0;
  }

  .empty-subtitle {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0;
  }

  @media (max-width: 768px) {
    .form-grid {
      grid-template-columns: 1fr;
    }

    .stats-row {
      grid-template-columns: 1fr;
    }
  }
</style>
