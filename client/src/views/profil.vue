<template>
<<<<<<< HEAD
  <div class="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6">

    <!-- LEFT SIDEBAR -->
    <aside class="md:col-span-1 bg-white p-6 rounded-xl shadow border">
      <div class="text-center">
        <img
          :src="user.profilePicture || defaultProfile"
          class="w-32 h-32 rounded-full mx-auto object-cover border"
=======
  <div class="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6">
    <!-- Sidebar Profile -->
    <aside class="md:col-span-1 bg-white p-4 rounded-lg shadow">
      <div class="text-center">
        <img
          :src="user.image || defaultProfile"
>>>>>>> 94099571f81f307fa066ffb7d8d6efe8fd7b58c6
          alt="Profile"
        />
<<<<<<< HEAD

        <input type="file" @change="handleImageUpload" class="mt-3 text-sm" />

        <h2 class="text-xl font-bold mt-4">{{ user.first_name || "N/A" }} {{ user.last_name || "N/A"}}</h2>
        <p class="text-gray-500">{{ user.email }}</p>
      </div>

      <div class="mt-6 space-y-2 text-sm">
        <p><strong>Home:</strong> {{ profile.home || "N/A" }}</p>
        <p><strong>Address:</strong> {{ profile.address || "N/A" }}</p>
        <p><strong>Workplace:</strong> {{ profile.workplace || "N/A" }}</p>
        <p><strong>Education:</strong> {{ profile.education || "N/A" }}</p>
        <p><strong>Phone:</strong> {{ profile.phone || "N/A" }}</p>
      </div>

      <!-- EDIT PROFILE FORM -->
      <form @submit.prevent="saveProfile" class="mt-6 space-y-3">

        <input v-model="profile.first_name" placeholder="First Name" class="input" />
        <input v-model="profile.last_name" placeholder="Last Name" class="input" />
        <textarea v-model="profile.bio" placeholder="Bio" class="input h-20"></textarea>

        <input v-model="profile.address" placeholder="Address" class="input" />
        <input v-model="profile.phone" placeholder="Phone" class="input" />
        <input v-model="profile.home" placeholder="Home" class="input" />
        <input v-model="profile.workplace" placeholder="Workplace" class="input" />
        <input v-model="profile.education" placeholder="Education" class="input" />

        <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full">
          Save Profile
=======
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
>>>>>>> 94099571f81f307fa066ffb7d8d6efe8fd7b58c6
        </button>
      </form>

    </aside>

    <!-- MAIN CONTENT -->
    <main class="md:col-span-3 space-y-6">
<<<<<<< HEAD

      <!-- POSTS SECTION -->
      <section class="bg-white p-6 rounded-xl shadow border">
        <h3 class="text-xl font-bold mb-4">My Posts</h3>

=======
      <!-- Posts -->
      <section class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-xl font-bold mb-4">Posts</h3>
>>>>>>> 94099571f81f307fa066ffb7d8d6efe8fd7b58c6
        <div v-if="posts.length === 0" class="text-gray-500">No posts yet.</div>

        <div v-else class="space-y-4">
<<<<<<< HEAD
          <div
            v-for="post in posts"
            :key="post.id"
            class="border p-4 rounded-lg shadow-sm bg-gray-50"
          >
            <p class="font-semibold">{{ user.first_name }}</p>
=======
          <div v-for="post in posts" :key="post.id" class="border p-3 rounded">
>>>>>>> 94099571f81f307fa066ffb7d8d6efe8fd7b58c6
            <p class="text-gray-700">{{ post.content }}</p>
            <p class="text-xs text-gray-400">{{ formatDate(post.createdAt) }}</p>
          </div>
        </div>
      </section>

      <!-- FRIENDS -->
      <section class="bg-white p-6 rounded-xl shadow border">
        <h3 class="text-xl font-bold mb-4">Friends</h3>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div
            v-for="friend in friends"
            :key="friend.id"
            class="text-center bg-gray-50 p-3 rounded-lg shadow-sm"
          >
            <img
              :src="friend.profilePicture || defaultProfile"
              class="w-20 h-20 rounded-full mx-auto object-cover"
            />
            <p class="mt-2 text-sm font-semibold">{{ friend.name }}</p>
          </div>
        </div>
      </section>

    </main>

  </div>
</template>

<script setup>
<<<<<<< HEAD
import { ref, onMounted } from "vue";
import axios from "axios";
=======
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
>>>>>>> 94099571f81f307fa066ffb7d8d6efe8fd7b58c6

const defaultProfile = "https://www.gravatar.com/avatar?d=mp&s=200";

<<<<<<< HEAD
const user = ref(JSON.parse(localStorage.getItem("user")) || {});
const user_id = user.value.id;
const profile = ref({});

const posts = ref([]);
const friends = ref([]);

console.log("users", user.value.id)
onMounted(async () => {
  if (!user.value.id) return;

  const res = await axios.get(`http://localhost:3000/profil/${user_id}`);
  profile.value = res.data;
 
=======
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
>>>>>>> 94099571f81f307fa066ffb7d8d6efe8fd7b58c6
});

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    user.value.profilePicture = reader.result;
  };
  reader.readAsDataURL(file);
};

<<<<<<< HEAD
 const saveProfile = async () => {
  const payload = {
    ...profile.value,
    id_user:  user.value.id
  };
  try {
    const res = await axios.post("http://localhost:3000/profil", payload);
    alert("Profile updated!");
  } catch (err) {
    alert("Profile update failed: " + (err?.response?.data?.message || err.message));
    console.error("Profile update error:", err);
  }
};

 
const formatDate = (date) => new Date(date).toLocaleDateString();
=======
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
>>>>>>> 94099571f81f307fa066ffb7d8d6efe8fd7b58c6
</script>

<style scoped>
.input {
  width: 100%;
  padding: .55rem;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  background: #fafafa;
}
.input:focus {
  border-color: #2563eb;
  outline: none;
}
</style>
