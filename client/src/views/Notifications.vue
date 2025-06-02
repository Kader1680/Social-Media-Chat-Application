<template>
  <main class="max-w-3xl mx-auto mt-8 px-4">
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4">Notifications</h2>

      <!-- <div v-if="loading" class="text-gray-500">Loading notifications...</div>

      <div v-else-if="notifications.length === 0" class="text-gray-500">No notifications found.</div>

      <ul v-else class="divide-y divide-gray-200">
        <li
          v-for="(notification, index) in notifications"
          :key="index"
          class="py-4 flex items-start gap-4"
        >
          <div class="w-3 h-3 rounded-full mt-2" :class="notification.read ? 'bg-gray-300' : 'bg-blue-500'"></div>
          <div>
            <p class="text-gray-800">{{ notification.message }}</p>
            <p class="text-sm text-gray-500">{{ formatDate(notification.date) }}</p>
          </div>
        </li>
      </ul> -->
    </div>
  </main>
</template>

<script setup>
// import { ref, onMounted } from 'vue';
// import axios from 'axios';

// const notifications = ref([]);
// const loading = ref(true);

// const fetchNotifications = async () => {
//   try {
//     const user = JSON.parse(localStorage.getItem('user'));
//     const res = await axios.get(`http://localhost:3000/notifications/`);
//     notifications.value = res.data;
//   } catch (err) {
//     console.error('Failed to load notifications:', err.message);
//   } finally {
//     loading.value = false;
//   }
// };

// const formatDate = (dateStr) => {
//   const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
//   return new Date(dateStr).toLocaleDateString(undefined, options);
// };

// onMounted(fetchNotifications);
</script>

<style scoped>
</style>
