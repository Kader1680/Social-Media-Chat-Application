<template>
  <div class="min-h-screen bg-gray-50 md:py-8">
    <div class="max-w-3xl mx-auto bg-white md:rounded-2xl shadow-xl border border-gray-200 flex flex-col h-[90vh] overflow-hidden">
      
      <div class="p-4 border-b border-gray-100 bg-white flex items-center justify-between sticky top-0 z-10">
        <div class="flex items-center gap-3">
          <router-link to="/chat" class="p-2 -ml-2 text-gray-400 hover:text-[#004182]">
            <i class="fa-solid fa-arrow-left"></i>
          </router-link>
          
          <div class="w-10 h-10 rounded-full bg-[#004182] flex items-center justify-center text-white font-bold shadow-inner">
            {{ friendId?.charAt(0).toUpperCase() }}
          </div>
          
          <div>
            <h2 class="font-bold text-gray-800 leading-tight"> {{ friend }}</h2>
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span class="text-xs text-gray-500 font-medium">Active Now</span>
            </div>
          </div>
        </div>

        <div class="flex gap-4 text-gray-400">
          <button class="hover:text-[#004182] transition-colors"><i class="fa-solid fa-phone"></i></button>
          <button class="hover:text-[#004182] transition-colors"><i class="fa-solid fa-video"></i></button>
          <button class="hover:text-[#004182] transition-colors"><i class="fa-solid fa-ellipsis-vertical"></i></button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-4 md:p-6 bg-[#f0f2f5] space-y-4 chat-messages-container">
        <div 
          v-for="msg in messages" 
          :key="msg.createdAt + msg.content" 
          class="flex flex-col w-full"
          :class="msg.sender === userId ? 'items-end' : 'items-start'"
        >
          <div 
            class="max-w-[85%] md:max-w-[70%] px-4 py-2.5 rounded-2xl text-sm shadow-sm relative group"
            :class="[
              msg.sender === userId 
                ? 'bg-[#004182] text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none',
              msg.temp ? 'opacity-70 italic' : 'opacity-100'
            ]"
          >
            <span v-if="msg.sender !== userId" class="text-[10px] font-bold block mb-1 opacity-50 uppercase">
              {{ friend }}
            </span>

            <p class="leading-relaxed">{{ msg.content }}</p>

            <div v-if="msg.sender === userId" class="absolute -left-6 bottom-1 opacity-0 group-hover:opacity-100 transition-opacity">
               <i v-if="msg.temp" class="fa-solid fa-circle-notch animate-spin text-[10px] text-gray-400"></i>
               <i v-else class="fa-solid fa-check-double text-[10px] text-[#004182]"></i>
            </div>
          </div>

          <span class="text-[10px] text-gray-400 mt-1 px-1">
             {{ formatTime(msg.createdAt) }}
          </span>
        </div>
        
        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full opacity-40">
           <i class="fa-solid fa-message text-6xl mb-4"></i>
           <p>Start your conversation with {{ friendId }}</p>
        </div>
      </div>

      <div class="p-4 bg-white border-t border-gray-100">
        <form @submit.prevent="handleSendMessage" class="flex items-center gap-3">
          <div class="flex-1 flex items-center bg-gray-100 rounded-2xl px-4 py-1 focus-within:ring-2 focus-within:ring-[#004182]/20 transition-all">
            <button type="button" class="text-gray-400 hover:text-[#004182] mr-2">
              <i class="fa-regular fa-face-smile text-xl"></i>
            </button>
            <input
              v-model="newMessage"
              type="text"
              placeholder="Type your message..."
              class="w-full bg-transparent border-none focus:ring-0 py-3 text-sm text-gray-700"
              required
            />
            <label class="text-gray-400 hover:text-[#004182] cursor-pointer ml-2">
              <i class="fa-solid fa-paperclip text-lg"></i>
              <input type="file" class="hidden" />
            </label>
          </div>
          
          <button 
            type="submit" 
            class="w-12 h-12 bg-[#004182] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#004182]/30 hover:bg-[#003366] transition-all active:scale-90"
          >
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
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
const friend = ref(null);


const friendId = route.params.friendId;

const _user = JSON.parse(localStorage.getItem('user')) || {};
const userId = _user._id || _user.id || '';

// Helper to format timestamps
const formatTime = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const scrollToBottom = () => {
  setTimeout(() => {
    const container = document.querySelector('.chat-messages-container');
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }, 100);
};

// const loadMessages = async () => {
//   try {
//     const response = await axios.get(`http://localhost:3000/chat/${friendId}`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//     });
//     messages.value = response.data.map(normalizeMessage);
//     scrollToBottom();
//   } catch (error) {
//     console.error('Failed to load messages:', error);
//   }
// };


const loadMessages = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/chat/${friendId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    friend.value = response.data.friend.username;
    
 
    messages.value = response.data.messages.map(normalizeMessage);

    scrollToBottom();
  } catch (error) {
    console.error('Failed to load messages:', error);
  }
};



const normalizeMessage = (m) => {
  return {
    sender: m.sender || m.senderId,
    receiver: m.receiver || m.receiverId,
    content: m.content || m.message,
    createdAt: m.createdAt || m.created_at || new Date().toISOString(),
    _id: m._id || m.id || null,
    temp: m.temp || false
  };
};

const isSameMessage = (a, b) => {
  if (!a || !b) return false;
  if ((a._id && b._id) && a._id === b._id) return true;
  if (a.content !== b.content) return false;
  if (a.sender !== b.sender) return false;
  const ta = Date.parse(a.createdAt || 0);
  const tb = Date.parse(b.createdAt || 0);
  return Math.abs(ta - tb) < 10000;
};

const removeMatchingTemp = (incoming) => {
  messages.value = messages.value.filter(m => !m.temp || !isSameMessage(m, incoming));
};

const handleSendMessage = async () => {
  if (!newMessage.value.trim()) return;

  const content = newMessage.value.trim();
  const messageData = {
    senderId: userId,
    receiverId: friendId,
    message: content
  };

  try {
    if (socket && socket.connected) {
      socket.emit('send message', messageData);
    } else {
      await axios.post(`http://localhost:3000/chat/${friendId}`, {
        sender: userId,
        receiver: friendId,
        content: content
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    }

    // Optimistic Update
    messages.value.push(normalizeMessage({ 
        senderId: userId, 
        receiverId: friendId, 
        message: content, 
        temp: true 
    }));
    
    newMessage.value = '';
    scrollToBottom();
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

onMounted(() => {
  loadMessages();
  if (socket && !socket.connected) socket.connect();
  if (socket && userId) socket.emit('join', userId);

  socket.on('newMessage', (msg) => {
    try {
      const normalized = normalizeMessage(msg);
      if (normalized.sender === friendId || normalized.receiver === friendId) {
        removeMatchingTemp(normalized);
        messages.value.push(normalized);
        scrollToBottom();
      }
    } catch (e) {
      console.error('Socket message error:', e);
    }
  });
});

onUnmounted(() => {
  if (socket) socket.off('newMessage');
});
</script>

<style scoped>
.chat-messages-container::-webkit-scrollbar {
  width: 4px;
}
.chat-messages-container::-webkit-scrollbar-track {
  background: transparent;
}
.chat-messages-container::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.chat-messages-container::-webkit-scrollbar-thumb:hover {
  background: #004182;
}

.message p {
  word-break: break-word;
}
</style>