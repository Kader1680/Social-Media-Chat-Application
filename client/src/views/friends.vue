<style>
.friends{
    display: flex;
    align-items: center;
    justify-content: space-between;
}


</style>
<template>
  <main class="max-w-6xl mx-auto px-4 py-8">
    <div class="friends flex align-items-center justify-content-between">
         <h1 class="text-2xl font-bold mb-6 text-gray-800">Friend Suggestions</h1>
        <div>
            <button class="text-1xl font-bold mb-6 ps-2 pe-2 text-white bg-[#004182] p-1">friends request</button>
            <button class="text-1xl font-bold mb-6 ps-2 pe-2 text-gray-800 bg-gray-200 p-1 ms-3">friend connections</button>
        </div>
    </div>

    <div class="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div
        v-for="friend in suggestions"
        :key="friend.id"
        class="bg-gray-100  rounded-xl shadow p-4 flex flex-col items-center text-center"
      >
        <img
          :src="friend.image"
          alt="Friend Avatar"
          class="w-24 h-24 rounded-full object-cover mb-3"
        />
        <h2 class="text-lg font-semibold text-gray-700">{{ friend.name }}</h2>
       <div class="flex gap-2">
         <button
          @click="addFriend(friend.id)"
          class="mt-4 px-2 py-1 bg-[#004182]  text-white rounded-2 transition"
        >
          Add Friend
        </button>

          <button
          @click="addFriend(friend.id)"
          class="mt-4 px-2 py-1 text-gray-800 bg-gray-200  rounded-2 transition"
        >
          delete
        </button>
       </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const suggestions = ref([
  { id: 1, name: 'John Doe', image: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Jane Smith', image: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Alex Lee', image: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, name: 'Emily Johnson', image: 'https://i.pravatar.cc/150?img=4' },
  { id: 5, name: 'Michael Brown', image: 'https://i.pravatar.cc/150?img=5' },
])

const addFriend = (id) => {
  alert(`Friend request sent to user with ID: ${id}`)
 
}
</script>

<style scoped>
/* Optional hover effect */
img {
  transition: transform 0.2s ease;
}
img:hover {
  transform: scale(1.05);
}
</style>
