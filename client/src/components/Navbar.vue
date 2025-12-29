<template>
    <!-- NAVBAR -->
    <nav class="navbar flex flex-col md:flex-row justify-between items-center bg-[#004182] p-4 md:p-6 text-white relative">
      <div class="navbar-logo mb-2 md:mb-0">
        <router-link to="/" class="text-2xl font-bold text-[#00bfff]">Pimpchat</router-link>
      </div>

      <!-- HAMBURGER BUTTON FOR SMALL SCREENS -->
      <button
        class="md:hidden absolute right-4 top-4 focus:outline-none z-20"
        @click="toggleMenu"
      >
        <span class="block w-6 h-0.5 bg-white mb-1 transition-transform" :class="{'rotate-45 translate-y-2': menuOpen}"></span>
        <span class="block w-6 h-0.5 bg-white mb-1" :class="{'opacity-0': menuOpen}"></span>
        <span class="block w-6 h-0.5 bg-white" :class="{'-rotate-45 -translate-y-2': menuOpen}"></span>
      </button>

      <ul
        class="navbar-links flex flex-col md:flex-row gap-3 md:gap-6 items-center md:static absolute md:bg-transparent bg-[#004182] md:w-auto w-full left-0 md:top-auto top-full md:p-0 p-4 transition-all duration-300 ease-in-out z-10"
        :class="{
          'max-h-64 opacity-100': menuOpen,
          'max-h-0 opacity-0 overflow-hidden': !menuOpen,
          'md:max-h-full md:opacity-100 md:overflow-visible': true
        }"
      >

        <template v-if="isAuthenticated">
          <li><router-link to="/" class="hover:text-[#00bfff]">Home</router-link></li>
          <li><router-link to="/friends" class="hover:text-[#00bfff]">Friends</router-link></li>
          <li><router-link to="/chat" class="hover:text-[#00bfff]">Messages</router-link></li>
          <li><router-link to="/notifications" class="hover:text-[#00bfff]">Notifications</router-link></li>
          <li><router-link :to="`/profil/${userId}`" class="hover:text-[#00bfff]">Profile</router-link></li>
          <li>
            <button @click="logout" class="hover:text-[#00bfff]">Logout</button>
          </li>
        </template>

        <template v-else>
          <li><router-link to="/login" class="hover:text-[#00bfff]">Login</router-link></li>
          <li><router-link to="/register" class="hover:text-[#00bfff]">Register</router-link></li>
        </template>
      </ul>
    </nav>

    
 
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const defaultProfile = "https://www.gravatar.com/avatar?d=mp&s=200";

const user = ref(JSON.parse(localStorage.getItem("user")) || {});
const profile = ref({});
const posts = ref([]);
const friends = ref([]);

// NAVBAR TOGGLE
const menuOpen = ref(false);
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// USER ID
const userId = user.value._id || "";

// AUTH CHECK
const isAuthenticated = computed(() => !!localStorage.getItem("token"));

// LOGOUT
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/login");
};

// LOAD PROFILE DATA
onMounted(async () => {
  if (!userId) return;

  try {
    const profileRes = await axios.get(`http://localhost:3000/profil/${userId}`);
    profile.value = profileRes.data || {};

    const postsRes = await axios.get(`http://localhost:3000/posts/${userId}`);
    posts.value = postsRes.data || [];

    const friendsRes = await axios.get(`http://localhost:3000/friends/${userId}`);
    friends.value = friendsRes.data || [];
  } catch (err) {
    console.error("Error loading profile:", err);
  }
});

// IMAGE UPLOAD
const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post(`http://localhost:3000/profil/upload/${userId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    profile.value.profilePicture = res.data.profilePicture;
  } catch (err) {
    console.error("Error uploading image:", err);
    alert("Failed to upload image");
  }
};

// SAVE PROFILE
const saveProfile = async () => {
  try {
    await axios.post("http://localhost:3000/profil", { ...profile.value, id_user: userId });
    alert("Profile updated successfully!");
  } catch (err) {
    console.error("Profile update error:", err);
    alert("Failed to update profile: " + (err?.response?.data?.message || err.message));
  }
};

// FORMAT DATE
const formatDate = (date) => new Date(date).toLocaleDateString();
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.55rem;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  background: #fafafa;
}
.input:focus {
  border-color: #2563eb;
  outline: none;
}

/* NAVBAR TRANSITIONS */
.navbar-links {
  transition: all 0.3s ease-in-out;
}

/* HAMBURGER SPAN TRANSFORMATIONS */
</style>
