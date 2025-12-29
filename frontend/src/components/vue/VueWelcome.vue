 <template>
  <div class="sms-sender">
    <div class="header-section">
      <div class="icon-wrapper">
        <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div>
        <h2 class="title">Quick Send SMS</h2>
        <p class="subtitle">Send instant messages worldwide</p>
      </div>
    </div>
    
    <div class="form-container" :class="{ 'sending': isSending }">
      <div class="input-group">
        <label class="label">
          <svg class="label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Phone Number
        </label>
        <div class="input-wrapper">
          <input 
            v-model="phoneNumber" 
            type="tel" 
            placeholder="+1 234 567 8900"
            class="input"
            :class="{ 'error': phoneError }"
            @blur="validatePhone"
            @input="phoneError = ''"
          />
          <span v-if="phoneNumber" class="input-clear" @click="phoneNumber = ''">✕</span>
        </div>
        <span v-if="phoneError" class="error-text">{{ phoneError }}</span>
      </div>
      
      <div class="input-group">
        <label class="label">
          <svg class="label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Message
        </label>
        <textarea 
          v-model="message" 
          placeholder="Type your message here..."
          rows="4"
          class="textarea"
          :class="{ 'error': messageError }"
          @input="updateCharCount"
        ></textarea>
        <div class="char-counter">
          <span :class="charCountClass">{{ message.length }} / 160</span>
          <span class="segments">{{ segments }} segment{{ segments !== 1 ? 's' : '' }}</span>
        </div>
        <span v-if="messageError" class="error-text">{{ messageError }}</span>
      </div>
      
      <button 
        @click="sendMessage"
        class="send-button"
        :class="{ 'loading': isSending }"
        :disabled="isSending"
      >
        <span v-if="!isSending" class="button-content">
          <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Send SMS
        </span>
        <span v-else class="button-content">
          <svg class="spinner" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sending...
        </span>
      </button>
      
      <transition name="notification">
        <div v-if="status" :class="['notification', statusType]">
          <svg v-if="statusType === 'success'" class="notification-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <svg v-else class="notification-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <span>{{ status }}</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const phoneNumber = ref('');
const message = ref('');
const status = ref('');
const statusType = ref('success');
const isSending = ref(false);
const phoneError = ref('');
const messageError = ref('');

const segments = computed(() => {
  const length = message.value.length;
  if (length === 0) return 0;
  return Math.ceil(length / 160);
});

const charCountClass = computed(() => {
  const length = message.value.length;
  if (length > 160) return 'text-orange-600';
  if (length > 140) return 'text-yellow-600';
  return 'text-gray-600';
});

const validatePhone = () => {
  if (!phoneNumber.value) {
    phoneError.value = 'Phone number is required';
    return false;
  }
  const phoneRegex = /^\+\d{10,15}$/;
  if (!phoneRegex.test(phoneNumber.value)) {
    phoneError.value = 'Invalid format. Use: +1234567890';
    return false;
  }
  phoneError.value = '';
  return true;
};

const validateMessage = () => {
  if (!message.value || message.value.trim().length === 0) {
    messageError.value = 'Message cannot be empty';
    return false;
  }
  if (message.value.length > 1600) {
    messageError.value = 'Message too long (max 1600 characters)';
    return false;
  }
  messageError.value = '';
  return true;
};

const updateCharCount = () => {
  messageError.value = '';
};

const sendMessage = async () => {
  const isPhoneValid = validatePhone();
  const isMessageValid = validateMessage();
  
  if (!isPhoneValid || !isMessageValid) {
    return;
  }
  
  isSending.value = true;
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  statusType.value = 'success';
  status.value = `Message sent successfully to ${phoneNumber.value}`;
  isSending.value = false;
  
  setTimeout(() => {
    phoneNumber.value = '';
    message.value = '';
    status.value = '';
  }, 4000);
};
</script>

<style scoped>
.sms-sender {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
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
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
}

.icon {
  width: 32px;
  height: 32px;
  color: white;
}

.title {
  font-size: 1.875rem;
  font-weight: 800;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}

.subtitle {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0.25rem 0 0 0;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: opacity 0.3s ease;
}

.form-container.sending {
  opacity: 0.7;
  pointer-events: none;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  width: 16px;
  height: 16px;
  color: #10b981;
}

.input-wrapper {
  position: relative;
}

.input, .textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.input:focus, .textarea:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.input.error, .textarea.error {
  border-color: #ef4444;
}

.input-clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  cursor: pointer;
  font-size: 1.25rem;
  transition: color 0.2s;
}

.input-clear:hover {
  color: #6b7280;
}

.textarea {
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
}

.char-counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  padding: 0 0.25rem;
}

.segments {
  color: #9ca3af;
  font-weight: 500;
}

.error-text {
  color: #ef4444;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  animation: shake 0.3s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.send-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.send-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.5);
}

.send-button:active:not(:disabled) {
  transform: translateY(0);
}

.send-button:disabled {
  cursor: not-allowed;
}

.send-button.loading {
  background: linear-gradient(135deg, #6ee7b7 0%, #34d399 100%);
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.button-icon {
  width: 20px;
  height: 20px;
}

.spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.notification {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.notification.success {
  background: #d1fae5;
  color: #065f46;
  border: 2px solid #10b981;
}

.notification.error {
  background: #fee2e2;
  color: #991b1b;
  border: 2px solid #ef4444;
}

.notification-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.notification-enter-active, .notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
