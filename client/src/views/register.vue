<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Register to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="username" class="block text-sm/6 font-medium text-gray-900">Username</label>
          <div class="mt-2 bottom-3">
            <input style="border: 2px solid blue;" v-model="username" type="text" id="username" required class="block w-full rounded-md px-3 py-1.5" />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div class="mt-2">
            <input style="border: 2px solid blue;" v-model="email" type="email" id="email" required class="block w-full rounded-md px-3 py-1.5" />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
          <div class="mt-2">
            <input style="border: 2px solid blue;" v-model="password" type="password" id="password" required class="block w-full rounded-md px-3 py-1.5" />
          </div>
        </div>

        <div>
          <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500">
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const username = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const handleSubmit = async () => {
  try {
    const res = await axios.post('http://localhost:3000/register', {
      username: username.value,
      email: email.value,
      password: password.value
    })

    if (res.data.status === 'success') {
      // ✅ Redirect to home
      router.push('/')
    }
  } catch (err) {
    console.error(err.response?.data?.message || err.message)
  }
}
</script>
