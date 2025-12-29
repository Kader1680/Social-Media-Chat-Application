<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
    <div class="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-blue-900/10 p-8 md:p-10 border border-gray-100">
      
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-[#004182] rounded-2xl mb-4 shadow-lg shadow-blue-700/30">
          <i class="fa-solid fa-user-plus text-white text-3xl"></i>
        </div>
        <h2 class="text-3xl font-black text-gray-900 tracking-tight">Create Account</h2>
        <p class="text-gray-500 mt-2 font-medium">Join the Pimpchat community today</p>
      </div>

      <transition name="fade">
        <div 
          v-if="errorMessage" 
          class="mb-6 flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm animate-shake"
        >
          <i class="fa-solid fa-circle-exclamation"></i>
          <p class="font-semibold">{{ errorMessage }}</p>
        </div>
      </transition>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        
        <div class="space-y-1">
          <label for="username" class="text-xs font-bold text-gray-500 uppercase ml-1">Username</label>
          <div class="relative group">
            <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-[#004182] transition-colors">
              <i class="fa-solid fa-at"></i>
            </span>
            <input 
              v-model="username" 
              type="text" 
              id="username" 
              placeholder="johndoe123"
              required 
              class="custom-auth-input pl-11"
            />
          </div>
        </div>

        <div class="space-y-1">
          <label for="email" class="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
          <div class="relative group">
            <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-[#004182] transition-colors">
              <i class="fa-solid fa-envelope"></i>
            </span>
            <input 
              v-model="email" 
              type="email" 
              id="email" 
              placeholder="name@example.com"
              required 
              class="custom-auth-input pl-11"
            />
          </div>
        </div>

        <div class="space-y-1">
          <label for="password" class="text-xs font-bold text-gray-500 uppercase ml-1">Password</label>
          <div class="relative group">
            <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-[#004182] transition-colors">
              <i class="fa-solid fa-shield-halved"></i>
            </span>
            <input 
              v-model="password" 
              type="password" 
              id="password" 
              placeholder="Create a strong password"
              required 
              class="custom-auth-input pl-11"
            />
          </div>
        </div>

        <p class="text-[11px] text-gray-400 text-center px-4 leading-relaxed">
          By signing up, you agree to our 
          <a href="#" class="text-[#004182] font-bold">Terms of Service</a> and 
          <a href="#" class="text-[#004182] font-bold">Privacy Policy</a>.
        </p>

        <div class="pt-2">
          <button 
            type="submit" 
            class="w-full bg-[#004182] hover:bg-[#003366] text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-900/20 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Create My Account</span>
            <i class="fa-solid fa-paper-plane text-sm"></i>
          </button>
        </div>
      </form>

      <p class="mt-8 text-center text-gray-500 text-sm font-medium">
        Already have an account? 
        <router-link to="/login" class="text-[#004182] font-black hover:underline ml-1">
          Sign In
        </router-link>
      </p>
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
const errorMessage = ref('')

const handleSubmit = async () => {
  try {
    errorMessage.value = ''
    const res = await axios.post('http://localhost:3000/register', {
      username: username.value,
      email: email.value,
      password: password.value
    })

    if (res.data.status === 'success') {
      // Typically you'd log them in automatically or redirect to login
      router.push('/login')
    }
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Registration failed. Please try again.'
  }
}
</script>

<style scoped>
.custom-auth-input {
  width: 100%;
  padding-top: 0.875rem;
  padding-bottom: 0.875rem;
  padding-right: 1rem;
  border: 2px solid #f3f4f6;
  border-radius: 1rem;
  background-color: #f9fafb;
  font-size: 0.95rem;
  font-weight: 500;
  color: #111827;
  transition: all 0.2s ease-in-out;
}

.custom-auth-input:focus {
  outline: none;
  border-color: #004182;
  background-color: white;
  box-shadow: 0 0 0 4px rgba(0, 65, 130, 0.1);
}

.animate-shake {
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>