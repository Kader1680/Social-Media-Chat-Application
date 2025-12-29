<template>
  <main class="max-w-7xl mx-auto px-4 py-10 min-h-screen bg-gray-50/50">
    <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">People you may know</h1>
        <p class="text-gray-500 text-sm mt-1">Add friends to see their posts in your timeline.</p>
      </div>
      
      <div class="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
        <button class="px-5 py-2 rounded-lg text-sm font-bold transition-all bg-[#004182] text-white shadow-md">
          Suggestions
        </button>
        <button class="px-5 py-2 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
          Friend Requests
          <span class="ml-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">3</span>
        </button>
      </div>
    </div>

    <div v-if="loading" class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="i in 8" :key="i" class="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
        <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
        <div class="h-3 bg-gray-100 rounded w-1/2 mx-auto mb-6"></div>
        <div class="flex gap-2 w-full">
           <div class="h-10 bg-gray-200 rounded-lg flex-1"></div>
           <div class="h-10 bg-gray-100 rounded-lg flex-1"></div>
        </div>
      </div>
    </div>

    <div v-else class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="friend in suggestions"
        :key="friend._id"
        class="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-6 flex flex-col items-center transition-all duration-300 transform hover:-translate-y-1"
      >
        <div class="relative mb-4">
          <img
            :src="friend.avatar?.trim() ? friend.avatar : `https://ui-avatars.com/api/?name=${friend.username}&background=004182&color=fff`"
            class="w-28 h-28 rounded-full object-cover border-4 border-gray-50 group-hover:border-[#004182]/20 transition-all"
          />
          <div class="absolute bottom-1 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
        </div>

        <h2 class="text-lg font-bold text-gray-800 mb-1 group-hover:text-[#004182] transition-colors">
          {{ friend.username }}
        </h2>
        <p class="text-xs text-gray-400 mb-6 flex items-center gap-1">
          <i class="fa-solid fa-user-group"></i> 12 Mutual Friends
        </p>

        <div class="flex gap-2 w-full mt-auto">
          <button
            @click="addFriend(friend._id)"
            class="flex-1 bg-[#004182] hover:bg-[#003366] text-white text-sm font-bold py-2.5 rounded-xl shadow-lg shadow-blue-900/10 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <i class="fa-solid fa-user-plus text-xs"></i>
            Add
          </button>
          
          <button class="px-4 py-2.5 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-500 rounded-xl transition-all active:scale-95">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>

    <div v-if="!loading && suggestions.length === 0" class="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
        <i class="fa-solid fa-user-slash text-5xl text-gray-200 mb-4"></i>
        <h3 class="text-xl font-bold text-gray-800">No suggestions yet</h3>
        <p class="text-gray-500">Check back later for more connections.</p>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const suggestions = ref([])
const loading = ref(true)

const token = localStorage.getItem('token')
if (!token) router.push('/login')

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { Authorization: `Bearer ${token}` }
})

const fetchFriends = async () => {
  try {
    const res = await api.get('/chat')
    suggestions.value = res.data
  } catch (err) {
    localStorage.clear()
    router.push('/login')
  } finally {
    loading.value = false
  }
}

const addFriend = id => {
  alert(`Friend request sent to ${id}`)
}

onMounted(fetchFriends)
</script>

<style scoped>
/* Smooth transitions for all elements */
* {
  transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;
}

/* Skeleton Loading Animation */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>