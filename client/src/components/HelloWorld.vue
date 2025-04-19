<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>


<main class="max-w-7xl mx-auto flex flex-col md:flex-row mt-6 px-4 gap-6">
    
    <!-- Sidebar -->
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

    <!-- Feed -->
    <section class="flex-1 space-y-6">

      <!-- Create Post -->
      <div class="bg-white p-4 rounded-lg shadow-sm">
        <textarea placeholder="What's on your mind?" class="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400" rows="3"></textarea>
        <div class="text-right mt-2">
          <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Post</button>
        </div>
      </div>

      <!-- Post -->
      <div class="bg-white p-4 rounded-lg shadow-sm space-y-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div>
            <p class="font-semibold">Jane Smith</p>
            <p class="text-sm text-gray-500">2 hours ago</p>
          </div>
        </div>
        <p>Enjoying the weekend vibes! ☀️</p>
        <div class="flex gap-4 text-gray-500 text-sm">
          <button class="hover:text-blue-500">👍 Like</button>
          <button class="hover:text-blue-500">💬 Comment</button>
          <button class="hover:text-blue-500">↗️ Share</button>
        </div>
      </div>

      <!-- Another Post -->
      <div class="bg-white p-4 rounded-lg shadow-sm space-y-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div>
            <p class="font-semibold">Alex Lee</p>
            <p class="text-sm text-gray-500">5 hours ago</p>
          </div>
        </div>
        <p>Started working on a new project today. Super excited to share more soon!</p>
        <div class="flex gap-4 text-gray-500 text-sm">
          <button class="hover:text-blue-500">👍 Like</button>
          <button class="hover:text-blue-500">💬 Comment</button>
          <button class="hover:text-blue-500">↗️ Share</button>
        </div>
      </div>

    </section>
  </main>



</template>

<style scoped></style>
