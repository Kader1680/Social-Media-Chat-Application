<style scoped>
img, video {
  transition: all 0.3s ease-in-out;
}
</style>
<template>
<main class="max-w-7xl mx-auto flex flex-col md:flex-row mt-6 px-4 gap-6">
    <aside class="w-full md:w-1/4 hidden md:block">
      <div class="bg-white rounded-lg p-4 shadow-sm">
        <h2 class="font-semibold mb-3">Friends</h2>
        <ul class="space-y-2">
          <li class="flex items-center gap-2"><div class="w-8 h-8 bg-gray-300 rounded-full"></div> John Doe</li>
          <li class="flex items-center gap-2"><div class="w-8 h-8 bg-gray-300 rounded-full"></div> Jane Smith</li>
          <li class="flex items-center gap-2"><div class="w-8 h-8 bg-gray-300 rounded-full"></div> Alex Lee</li>
        </ul>
      </div>
    </aside>

    <section class="flex-1 space-y-6">



    <form @submit.prevent="submitPost" class="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow space-y-6">
    <h2 class="text-2xl font-bold text-gray-800">Create a New Post</h2>

    <textarea
      v-model="content"
      placeholder="What's on your mind?"
      class="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      rows="4"
    ></textarea>

    <!-- <div>
      <label class="block text-gray-600 font-medium mb-2">Upload Image or Video</label>
      <input
        type="file"
        accept="image/*,video/*"
        @change="handleFileUpload"
        class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
      />
    </div> -->

    <!-- <div v-if="previewUrl" class="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      <img v-if="isImage" :src="previewUrl" class="w-full max-h-80 object-cover" />
      <video v-else controls class="w-full max-h-80">
        <source :src="previewUrl" />
        Your browser does not support the video tag.
      </video>
    </div> -->

    <div class="text-right">
      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
      >
        Post
      </button>
    </div>
  </form>


    </section>
  </main>


</template>


<script setup>
import { ref } from 'vue'
import axios from 'axios'

const content = ref('')
const file = ref(null)

const submitPost = async () => {
  try {
    const res = await axios.post('http://localhost:3000', {
      content: content.value,
      file: file.value,
      id_user: JSON.parse(localStorage.getItem('user')).id
    })

 
    if (res.data.status === 'success') {
     
      router.push('/')
    }
  } catch (err) {
    console.error(err.response?.data?.message || err.message)
  }
}




</script>
