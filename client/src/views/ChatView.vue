<template>
  <div>
    <div v-for="msg in messages" :key="msg.createdAt">
      <strong>{{ msg.senderId === userId ? 'You' : 'Friend' }}:</strong> {{ msg.message }}
    </div>

    <input v-model="newMessage" @keyup.enter="handleSendMessage" placeholder="Type a message..." />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import socket from '../socket'; // adjust path
import axios from 'axios';

const userId = 'YOUR_USER_ID'; // Get this from auth (store or localStorage)
const friendId = 'FRIEND_USER_ID'; // Who you’re chatting with

const messages = ref([]);
const newMessage = ref('');

onMounted(async () => {
  // Connect user to socket
  socket.emit('addUser', userId);

  // Listen for incoming messages
  socket.on('getMessage', (data) => {
    messages.value.push(data);
  });

  // Load chat history
  const res = await axios.get(`http://localhost:5000/api/messages/${friendId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  messages.value = res.data;
});

onBeforeUnmount(() => {
  socket.off('getMessage');
});

const handleSendMessage = async () => {
  if (!newMessage.value) return;

  const msgData = {
    senderId: userId,
    receiverId: friendId,
    message: newMessage.value
  };

  // Emit message through socket
  socket.emit('sendMessage', msgData);

  // Save message to DB
  await axios.post('http://localhost:5000/api/messages', {
    receiverId: friendId,
    message: newMessage.value
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  // Push message locally
  messages.value.push({ ...msgData, createdAt: new Date() });

  newMessage.value = '';
};
</script>



