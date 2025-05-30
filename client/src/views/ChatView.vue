<style>
.messenger-container {
  display: flex;
  height: 100vh;
}

.friends-list {
  width: 25%;
  background-color: #f0f0f0;
  padding: 1rem;
  overflow-y: auto;
  border-right: 1px solid #ccc;
}

.friends-list ul {
  list-style: none;
  padding: 0;
}

.friends-list li {
  padding: 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
}

.friends-list li  img{
 
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
}


.friends-list li:hover {
  background-color: #e0e0e0;
}

.chat-area {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.message {
  margin: 0.5rem 0;
}

.message-input {
  display: flex;
  gap: 0.5rem;
}

.message-input input {
  flex: 1;
  padding: 0.5rem;
}

.message-input button {
  padding: 0.5rem 1rem;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
}
.friends-list .allfriend{
  color: "#0036f5";
}

</style>
<template>
  <div class="messenger-container">
    <div class="friends-list">
      <h2 class="allfriend">All Friends</h2>
      <ul>
        <li 
          v-for="friend in friends" 
          :key="friend._id" 
          @click="selectFriend(friend)"
          :class="{ 'selected': selectedFriend?._id === friend._id }"
        >
          <img src="https://imgs.search.brave.com/rwE-hC6ESt3hBJZhImPkb-KvU26bLDKVe-OKv1y50-M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzE0LzQz/LzU1LzE0NDM1NWQ3/YjM2YzVmNjQ2NDM1/NDIzNzk4MjgxY2U5/LmpwZw" alt="">
          {{ friend.username }}
        </li>
      </ul>
    </div>

    <div class="chat-area" v-if="selectedFriend">
      <div class="chat-header">
        <h3>Chat with {{ selectedFriend.username }}</h3>
      </div>
      <div class="messages">
        <div 
          v-for="msg in messages" 
          :key="msg._id || msg.createdAt" 
          class="message"
          :class="{ 'sent': msg.senderId === userId, 'received': msg.senderId !== userId }"
        >
          <strong>{{ msg.senderId === userId ? 'You' : selectedFriend.username }}:</strong> 
          {{ msg.message }}
        </div>
      </div>

      <div class="message-input">
        <input 
          v-model="newMessage" 
          placeholder="Type a message..." 
          @keyup.enter="handleSendMessage" 
        />
        <button @click="handleSendMessage">Send</button>
      </div>
    </div>
    <div class="chat-area" v-else>
      <div class="no-chat-selected">
        <p>Select a friend to start chatting</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const messages = ref([]);
const newMessage = ref('');
const friends = ref([]);
const selectedFriend = ref(null);

const route = useRoute();
const router = useRouter();

const user = JSON.parse(localStorage.getItem('user'));
const userId = user?._id;

const fetchFriends = async () => {
  try {
    const response = await axios.get('http://localhost:3000/chat', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    friends.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const fetchMessages = async (friendId) => {
  if (!friendId) return;
  
  try {
    const response = await axios.get(`http://localhost:3000/chat/${friendId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    messages.value = response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

const selectFriend = (friend) => {
  selectedFriend.value = friend;
  router.push(`/chat/${friend._id}`);
  fetchMessages(friend._id);
};

const handleSendMessage = async () => {
  if (!newMessage.value.trim() || !selectedFriend.value) return;

  const messageData = {
    senderId: userId,
    receiverId: selectedFriend.value._id,
    message: newMessage.value.trim()
  };

  try {
    const response = await axios.post('http://localhost:3000/api/messages', messageData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    messages.value.push(response.data);
    newMessage.value = '';
    
    // Scroll to bottom of messages
    setTimeout(() => {
      const messagesContainer = document.querySelector('.messages');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 50);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

onMounted(async () => {
  await fetchFriends();

  if (route.params.friendId) {
    const friend = friends.value.find(f => f._id === route.params.friendId);
    if (friend) {
      selectedFriend.value = friend;
      await fetchMessages(friend._id);
    }
  }
});

watch(() => route.params.friendId, async (newId) => {
  if (newId) {
    const friend = friends.value.find(f => f._id === newId);
    if (friend) {
      selectedFriend.value = friend;
      await fetchMessages(friend._id);
    }
  }
});
</script>

<style scoped>
.messenger-container {
  display: flex;
  height: 80vh;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.friends-list {
  width: 250px;
  border-right: 1px solid #ddd;
  overflow-y: auto;
}

.friends-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.friends-list li {
  padding: 12px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
}

.friends-list li:hover {
  background-color: #f5f5f5;
}

.friends-list li.selected {
  background-color: #e0e0e0;
}

.friends-list img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

.messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  padding: 8px 12px;
  border-radius: 8px;
  max-width: 70%;
}

.message.sent {
  align-self: flex-end;
  background-color: #dcf8c6;
}

.message.received {
  align-self: flex-start;
  background-color: #f1f0f0;
}

.message-input {
  display: flex;
  padding: 15px;
  border-top: 1px solid #ddd;
}

.message-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
}

.message-input button {
  margin-left: 10px;
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.message-input button:hover {
  background-color: #45a049;
}

.no-chat-selected {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #888;
}
</style>