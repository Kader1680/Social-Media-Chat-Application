<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <router-link to="/">🔵 Pincom</router-link>
    </div>

    <ul class="navbar-links">
      <li><router-link to="/">Home</router-link></li>

      <div v-if="isAuthenticated">
        <router-link to="/friends">Friends</router-link>
        <router-link to="/chat">Messages</router-link>
        <router-link to="/notifications">Notifications</router-link>
        <router-link :to="`/profil/${userId}`">Profile</router-link>
        <button @click="logout">Logout</button>
      </div>

      <div v-else>
        <li style="margin-right: 1rem;"><router-link to="/login">Login</router-link></li>
        <li style="margin-left: 1rem;"><router-link to="/register">Register</router-link></li>
      </div>
    </ul>
  </nav>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isAuthenticated = computed(() => !!localStorage.getItem('token'));

const userId = ref('');
const user = localStorage.getItem('user');
if (user) {
  try {
    userId.value = JSON.parse(user).id;
  } catch (err) {
    console.error('Invalid user in localStorage:', err);
  }
}

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
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
