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
    background-color: #004182b0;
    align-self: flex-end;
    margin-left: 20rem;
    color: white;
}

.message-received {
  background-color: #e8e8e8d6;
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
    background-color: #004182;
    color: white;
    border: none;
    cursor: pointer;
    width: 15%;
    border-radius: 8px;
}


</style>




<template>
  <div class="chat-container">
    <div class="chat-header">
      <h2>Chat with Friend: {{ friendId }}</h2>
    </div>

    <div class="chat-messages">
      <div
        v-for="msg in messages"
        :key="msg.createdAt"
        :class="msg.sender === userId ? 'message-sent' : 'message-received'"
        class="message"
      >
        <p><strong>{{ msg.sender === userId ? 'You' : `${friendId}` }} </strong> <br>  {{ msg.content }}</p>
      </div>
    </div>

    <form @submit.prevent="handleSendMessage" class="chat-form">
      <input
        v-model="newMessage"
        type="text"
        placeholder="Type your message..."
        required
      />
      <button style="background-color: #004182;" type="submit">Send</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import socket from '../socket';

const messages = ref([]);
const newMessage = ref('');
const route = useRoute();

const friendId = route.params.friendId;

const _user = JSON.parse(localStorage.getItem('user')) || {};
const userId = _user._id || _user.id || '';

// console.log(userId)

const loadMessages = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/chat/${friendId}`, {
      headers: { 
        
        Authorization: `Bearer ${localStorage.getItem('token')}`
        // "x-user-id": userId


       }
    });
    messages.value = response.data;
  } catch (error) {
    console.error('Failed to load messages:', error);
  }
};

 
const normalizeMessage = (m) => {
  return {
    sender: m.sender || m.senderId,
    receiver: m.receiver || m.receiverId,
    content: m.content || m.message,
    createdAt: m.createdAt || m.created_at || new Date().toISOString()
  };
};

const handleSendMessage = async () => {
  if (!newMessage.value.trim()) return;

  const messageData = {
    senderId: userId,
    receiverId: route.params.friendId,
    message: newMessage.value.trim()
  };

  try {
    // Emit via socket for real-time delivery and persistence (server saves)
    if (socket && socket.connected) {
      socket.emit('send message', messageData);
    } else {
      // Fallback to HTTP POST if socket disconnected
      await axios.post(`http://localhost:3000/chat/${friendId}`, {
        sender: messageData.senderId,
        receiver: messageData.receiverId,
        content: messageData.message
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    }

    // Optimistically add to UI
    messages.value.push(normalizeMessage({ senderId: messageData.senderId, receiverId: messageData.receiverId, message: messageData.message }));
    newMessage.value = '';

    setTimeout(() => {
      const messagesContainer = document.querySelector('.chat-messages');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 50);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

onMounted(() => {
  loadMessages();

  // Ensure socket is connected
  if (socket && !socket.connected) {
    socket.connect();
  }

  // Join room for this user
  if (socket && userId) socket.emit('join', userId);

  // Listen for incoming messages
  socket.on('newMessage', (msg) => {
    try {
      const normalized = normalizeMessage(msg);
      // Only add messages that belong to this conversation
      if (normalized.sender === friendId || normalized.receiver === friendId) {
        messages.value.push(normalized);
      }
    } catch (e) {
      console.error('Error handling incoming socket message:', e);
    }
  });
});

onUnmounted(() => {
  if (socket) {
    socket.off('newMessage');
  }
});
</script>

