<template>
  <div class="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
    <!-- LEFT SIDEBAR -->
    <aside class="md:col-span-1 bg-white p-6 rounded-xl shadow border">
      <div class="text-center">
        <img
          :src="profile.profilePicture || defaultProfile"
          class="w-32 h-32 rounded-full mx-auto object-cover border"
          alt="Profile"
        />

        <input type="file" @change="handleImageUpload" class="mt-3 text-sm" />

        <h2 class="text-xl font-bold mt-4">
          {{ profile.first_name || "N/A" }} {{ profile.last_name || "N/A" }}
        </h2>
        <p class="text-gray-500">{{ user.email }}</p>
      </div>

      <div class="mt-6 space-y-2 text-sm">
        <p><strong>Bio:</strong> {{ profile.bio || "N/A" }}</p>
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

        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full">
          Save Profile
        </button>
      </form>

      <!-- USER INFO -->
      <div class="mt-6 space-y-2 text-sm">
        <p><strong>Home:</strong> {{ user.home || 'Not Added' }}</p>
        <p><strong>Live:</strong> {{ user.live || 'Not Added' }}</p>
        <p><strong>Work:</strong> {{ user.work || 'Not Added' }}</p>
        <p><strong>School:</strong> {{ user.school || 'Not Added' }}</p>
        <p><strong>Gender:</strong> {{ user.gender || 'Not Added' }}</p>
        <p><strong>Birth:</strong> {{ user.birth || 'Not Added' }}</p>
      </div>

      <!-- USER FORM -->
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

        <input v-model="user.birth" type="date" class="input" />

        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Save
        </button>
      </form>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="md:col-span-3 space-y-6">
      <!-- POSTS SECTION -->
      <section class="bg-white p-6 rounded-xl shadow border">
        <h3 class="text-xl font-bold mb-4">My Posts</h3>

        <div v-if="posts.length === 0" class="text-gray-500">No posts yet.</div>

        <div v-else class="space-y-4">
          <div
            v-for="post in posts"
            :key="post.id"
            class="border p-4 rounded-lg shadow-sm bg-gray-50"
          >
            <p class="font-semibold">{{ profile.first_name }}</p>
            <p class="text-gray-700">{{ post.content }}</p>
            <p class="text-xs text-gray-400">
              {{ formatDate(post.createdAt) }}
            </p>
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
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from 'vue-router';

const defaultProfile = "https://www.gravatar.com/avatar?d=mp&s=200";
const route = useRoute();

// Get user from localStorage
const user = ref(JSON.parse(localStorage.getItem("user")) || {});
const profile = ref({});
const posts = ref([]);
const friends = ref([]);

// Load profile data on mount
onMounted(async () => {
  if (!user.value.id) return;

  try {
    const res = await axios.get(`http://localhost:3000/profil/${user.value.id}`);
    profile.value = res.data || {};
    
    // Load posts (implement this endpoint)
    // const postsRes = await axios.get(`http://localhost:3000/posts/${user.value.id}`);
    // posts.value = postsRes.data || [];
    
    // Load friends (implement this endpoint)
    // const friendsRes = await axios.get(`http://localhost:3000/friends/${user.value.id}`);
    // friends.value = friendsRes.data || [];
  } catch (err) {
    console.error("Error loading profile:", err);
  }
});

const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);

  try {
    const res = await axios.post(
      `http://localhost:3000/profil/upload/${user.value.id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    profile.value.profilePicture = res.data.profilePicture;
  } catch (err) {
    console.error("Error uploading image:", err);
    alert("Failed to upload image");
  }
};

const saveProfile = async () => {
  try {
    const payload = {
      ...profile.value,
      id_user: user.value.id
    };
    
    await axios.post("http://localhost:3000/profil", payload);
    alert("Profile updated successfully!");
  } catch (err) {
    console.error("Profile update error:", err);
    alert("Failed to update profile: " + (err?.response?.data?.message || err.message));
  }
};

const formatDate = (date) => new Date(date).toLocaleDateString();
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
