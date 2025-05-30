<template>
  <div class="chat-container">
    <!-- Chat Header -->
    <div class="chat-header">
      <h2>Chat with Friend: {{ friendId }}</h2>
    </div>

    <!-- Messages Display -->
    <div class="chat-messages">
      <div
        v-for="msg in messages"
        :key="msg.createdAt"
        :class="msg.senderId === userId ? 'message-sent' : 'message-received'"
        class="message"
      >
        <p><strong>{{ msg.senderId === userId ? 'You' : 'Friend' }}:</strong> {{ msg.message }}</p>
      </div>
    </div>

    <!-- Message Form -->
    <form @submit.prevent="handleSendMessage" class="chat-form">
      <input
        v-model="newMessage"
        type="text"
        placeholder="Type your message..."
        required
      />
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const messages = ref([]);
const newMessage = ref('');
const route = useRoute();

const friendId = route.params.friendId;
const userId = JSON.parse(localStorage.getItem('user'))?.id || '';

// Load previous messages between user and friend
const loadMessages = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/messages/${friendId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    messages.value = response.data;
  } catch (error) {
    console.error('Failed to load messages:', error);
  }
};

// Send new message
const handleSendMessage = async () => {
  if (!newMessage.value.trim()) return;

  const messageData = {
    senderId: userId,
    receiverId: friendId,
    message: newMessage.value
  };

  try {
    // Send message to backend
    await axios.post('http://localhost:3000/messages', messageData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    // Add to local messages array
    messages.value.push({ ...messageData, createdAt: new Date() });
    newMessage.value = '';
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};

onMounted(() => {
  loadMessages();
});
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 90vh;
  padding: 1rem;
  border: 1px solid #ccc;
  max-width: 700px;
  margin: auto;
  background: #fff;
}

.chat-header {
  margin-bottom: 1rem;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  border: 1px solid #eee;
  background-color: #f9f9f9;
}

.message {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  max-width: 70%;
}

.message-sent {
  background-color: #d1e7dd;
  align-self: flex-end;
}

.message-received {
  background-color: #f8d7da;
  align-self: flex-start;
}

.chat-form {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.chat-form input {
  flex: 1;
  padding: 0.5rem;
}

.chat-form button {
  padding: 0.5rem 1rem;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
