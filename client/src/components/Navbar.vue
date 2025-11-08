<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <router-link to="/">Pimpchat</router-link>
    </div>

    <ul class="navbar-links">

      <li><router-link to="/">Home</router-link></li>

      <div v-if="isAuthenticated">
        <router-link to="/friends">Friends</router-link>
        <router-link to="/chat">Messages</router-link>
        <router-link to="/notifications">Notifications</router-link>
<<<<<<< HEAD

        <router-link :to="`/profil/${userId}`">Profile</router-link>

=======
        <router-link :to="`/profil/${userId}`">Profile</router-link>
>>>>>>> 94099571f81f307fa066ffb7d8d6efe8fd7b58c6
        <button @click="logout">Logout</button>
      </div>

      <div v-else>
<<<<<<< HEAD
        <li style="margin-right: 1rem;">
          <router-link to="/login">Login</router-link>
        </li>

        <li style="margin-left: 1rem;">
          <router-link to="/register">Register</router-link>
        </li>
=======
        <li style="margin-right: 1rem;"><router-link to="/login">Login</router-link></li>
        <li style="margin-left: 1rem;"><router-link to="/register">Register</router-link></li>
>>>>>>> 94099571f81f307fa066ffb7d8d6efe8fd7b58c6
      </div>

    </ul>
  </nav>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

<<<<<<< HEAD
const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id;


const isAuthenticated = computed(() => !! localStorage.getItem('token'));
=======
const isAuthenticated = computed(() => !!localStorage.getItem('token'));
>>>>>>> 94099571f81f307fa066ffb7d8d6efe8fd7b58c6

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
<<<<<<< HEAD
  localStorage.removeItem("user_id");
=======
  localStorage.removeItem('user');
>>>>>>> 94099571f81f307fa066ffb7d8d6efe8fd7b58c6
  router.push('/login');
};
</script>

<style scoped>
/* your existing styles unchanged */
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
<<<<<<< HEAD
=======

>>>>>>> 94099571f81f307fa066ffb7d8d6efe8fd7b58c6
ul a {
  margin-left: 1rem;
}
</style>
