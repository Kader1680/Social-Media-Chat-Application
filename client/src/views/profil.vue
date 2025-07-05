<template>
  <div class="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6">
    <!-- Sidebar Profile -->
    <aside class="md:col-span-1 bg-white p-4 rounded-lg shadow">
      <div class="text-center">
        <img
          :src="user.image || defaultProfile"
          alt="Profile"
          class="w-32 h-32 rounded-full mx-auto object-cover"
        />
        <input type="file" @change="handleImageUpload" class="mt-2" />
      </div>

      <div class="mt-6 space-y-2 text-sm">
        <p><strong>Home:</strong> {{ user.home || 'Not Added' }}</p>
        <p><strong>Live:</strong> {{ user.live || 'Not Added' }}</p>
        <p><strong>Work:</strong> {{ user.work || 'Not Added' }}</p>
        <p><strong>School:</strong> {{ user.school || 'Not Added' }}</p>
        <p><strong>Gender:</strong> {{ user.gender || 'Not Added' }}</p>
        <p><strong>Birth:</strong> {{ user.birth || 'Not Added' }}</p>
      </div>

      <form @submit.prevent="saveProfile" class="mt-4 space-y-2">
        <input v-model="user.home" placeholder="Home" class="input" />
        <input v-model="user.live" placeholder="Live" class="input" />
        <input v-model="user.work" placeholder="Work" class="input" />
        <input v-model="user.school" placeholder="School" class="input" />
        <select v-model="user.gender" class="input">
          <option disabled value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input v-model="user.birth" type="date" class="input" placeholder="Birth" />
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Save
        </button>
      </form>
    </aside>

    <!-- Main Content -->
    <main class="md:col-span-3 space-y-6">
      <!-- Posts -->
      <section class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-xl font-bold mb-4">Posts</h3>
        <div v-if="posts.length === 0" class="text-gray-500">No posts yet.</div>
        <div v-else class="space-y-4">
          <div v-for="post in posts" :key="post.id" class="border p-3 rounded">
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
import axios from 'axios';
import { useRoute } from 'vue-router';

const defaultProfile = 'https://www.gravatar.com/avatar?d=mp&s=200';

const route = useRoute();
const profileId = ref(route.params.id || null);

const storedUser = localStorage.getItem("user");
const userId = storedUser ? JSON.parse(storedUser).id : null;
 
const user = ref({
  image: '',
  home: '',
  live: '',
  work: '',
  school: '',
  gender: '',
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

onMounted(async () => {
  
  if (!profileId.value) {
    console.error("Profile ID not found.");
    return;
  }

  try {
    const res = await axios.get(`http://localhost:3000/profil/${profileId.value}`);
    const profile = res.data;
   

    console.log(profile)
    user.value = {  
      // image: profile.image || '',
      home: profile.home || '',
      live: profile.live || '',
      work: profile.work || '',
      school: profile.school || '',
      gender: profile.gender || '',
      birth: profile.datebirth ? profile.datebirth.slice(0, 10) : ''
    };
  } catch (err) {
    console.error('Error loading profile:', err);
  }
});

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      user.value.image = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

const saveProfile = async () => {
   
  if (!userId || !profileId.value) return alert('User or profile not found.');

  console.log(profileId.value)
   
  try {
    await axios.put(`http://localhost:3000/profil/${profileId.value}`, {
      home: user.value.home,
      live: user.value.live,
      work: user.value.work,
      school: user.value.school,
      gender: user.value.gender,
      datebirth: user.value.birth,
      // image: user.value.image
    });
    alert('Profile updated successfully!');
  } catch (err) {
    console.error('Error saving profile:', err);
    alert('Failed to save profile');
  }
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
