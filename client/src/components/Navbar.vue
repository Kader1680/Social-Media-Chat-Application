<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <router-link to="/">Pimpchat</router-link>
    </div>

    <ul class="navbar-links">

      <li><router-link to="/">Home</router-link></li>

      <!-- SHOW WHEN AUTHENTICATED -->
      <template v-if="isAuthenticated">

        <li><router-link to="/friends">Friends</router-link></li>
        <li><router-link to="/chat">Messages</router-link></li>
        <li><router-link to="/notifications">Notifications</router-link></li>
        <li><router-link :to="`/profil/${userId}`">Profile</router-link></li>

        <li>
          <button @click="logout">Logout</button>
        </li>

      </template>

      <!-- SHOW WHEN NOT AUTHENTICATED -->
      <template v-else>
        <li style="margin-right: 1rem;">
          <router-link to="/login">Login</router-link>
        </li>
        <li style="margin-left: 1rem;">
          <router-link to="/register">Register</router-link>
        </li>
      </template>

    </ul>
  </nav>
</template>


<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// ✅ check token
const isAuthenticated = computed(() => !!localStorage.getItem("token"));

// ✅ get userId
const userData = localStorage.getItem("user");
let userId = "";

if (userData) {
  try {
    userId = JSON.parse(userData).id;
  } catch (err) {
    console.error("Invalid user in localStorage:", err);
  }
}

// ✅ logout function
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/login");
};
</script>


<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #004182;
  padding: 1rem 2rem;
  color: white;
}

.navbar-logo a {
  color: #00bfff;
  font-weight: bold;
  font-size: 1.5rem;
  text-decoration: none;
}

.navbar-links {
  list-style: none;
  display: flex;
  gap: 1.2rem;
}

.navbar-links li a,
.navbar-links li button {
  color: white;
  text-decoration: none;
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
}

.navbar-links li button:hover,
.navbar-links li a:hover {
  color: #00bfff;
}

ul a {
  margin-left: 1rem;
}
</style>
