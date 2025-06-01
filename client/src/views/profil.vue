<template>
  <div class="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6">
    <aside class="md:col-span-1 bg-white p-4 rounded-lg shadow">
      <div class="text-center">
        <img
          :src="user.profilePicture || defaultProfile"
          alt="Profile"
          class="w-32 h-32 rounded-full mx-auto object-cover"
        />
        <input type="file" @change="handleImageUpload" class="mt-2" />
        <h2 class="text-xl font-bold mt-4">{{ user.name }}</h2>
        <p class="text-gray-500">{{ user.email }}</p>
      </div>

      <div class="mt-6 space-y-2 text-sm">
        <p><strong>Home:</strong> {{ user.home || 'N/A' }}</p>
        <p><strong>Live:</strong> {{ user.live || 'N/A' }}</p>
        <p><strong>Work:</strong> {{ user.work || 'N/A' }}</p>
        <p><strong>Birth:</strong> {{ user.birth || 'N/A' }}</p>
      </div>

      <form @submit.prevent="saveProfile" class="mt-4 space-y-2">
        <input v-model="user.home" placeholder="Home" class="input" />
        <input v-model="user.live" placeholder="Live" class="input" />
        <input v-model="user.work" placeholder="Work" class="input" />
        <input v-model="user.birth" placeholder="Birth" type="date" class="input" />
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded w-full">Save</button>
      </form>
    </aside>

    <!-- Main Content -->
    <main class="md:col-span-3 space-y-6">
      <!-- Posts -->
      <section class="bg-white p-4 rounded-lg shadow">
        <h1>{{   user_profil  }}</h1>
        
        <h3 class="text-xl font-bold mb-4">Posts</h3>
        <div v-if="posts.length === 0" class="text-gray-500">No posts yet.</div>
        <div v-else class="space-y-4">
          <div v-for="post in posts" :key="post.id" class="border p-3 rounded">
            <p class="font-semibold">{{ user.name }}</p>
            <p class="text-gray-700">{{ post.content }}</p>
            <p class="text-xs text-gray-400">{{ formatDate(post.createdAt) }}</p>
          </div>
        </div>
      </section>

      <!-- Friends -->
      <section class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-xl font-bold mb-4">Friends</h3>
        <div v-if="friends.length === 0" class="text-gray-500">No friends yet.</div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div
            v-for="friend in friends"
            :key="friend.id"
            class="text-center bg-gray-50 p-3 rounded-lg shadow-sm"
          >
            <img
              :src="friend.profilePicture || defaultProfile"
              class="w-20 h-20 rounded-full mx-auto object-cover"
              alt="Friend"
            />
            <p class="mt-2 text-sm font-semibold">{{ friend.name }}</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const defaultProfile = 'https://www.gravatar.com/avatar?d=mp&s=200';

 
// Dummy data
const user = ref({
  name: 'John Doe',
  email: 'john@example.com',
  profilePicture: '',
  home: '',
  live: '',
  work: '',
  birth: ''
});

const posts = ref([
  { id: 1, content: 'Hello, this is my first post!', createdAt: new Date() },
  { id: 2, content: 'Loving Vue 3 and Tailwind!', createdAt: new Date() },
]);

const friends = ref([
  { id: 1, name: 'Alice', profilePicture: '' },
  { id: 2, name: 'Bob', profilePicture: '' },
  { id: 3, name: 'Charlie', profilePicture: '' },
]);

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      user.value.profilePicture = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

const saveProfile = () => {
  console.log('Profile saved', user.value);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
</script>

<style scoped>
.input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
}
</style>
