<template>
    <div class="bg-gray-100">
      <div class="container mx-auto py-8">
        <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <!-- Sidebar -->
          <div class="col-span-4 sm:col-span-3">
            <div class="bg-white shadow rounded-lg p-6">
              <div class="flex flex-col items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/94.jpg"
                  alt="Profile"
                  class="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                />
                <h1 class="text-xl font-bold">John Doe</h1>
                <p class="text-gray-700">Software Developer</p>
                <div class="mt-6 flex flex-wrap gap-4 justify-center">
                  <a href="https://example.com" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    complete profile
                  </a>
                  <a href="https://example.com" class="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">
                    Resume
                  </a>
                </div>
              </div>
              <hr class="my-6 border-t border-gray-300" />
              <div class="flex flex-col">
                <span class="text-gray-700 uppercase font-bold tracking-wider mb-2">Skills</span>
                <ul class="list-disc list-inside space-y-1 text-gray-800">
                  <li>JavaScript</li>
                  <li>React</li>
                  <li>Node.js</li>
                  <li>HTML/CSS</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
            </div>
          </div>
  
          <!-- Main Content -->
          <div class="col-span-4 sm:col-span-9">
            <div class="bg-white shadow rounded-lg p-6">
              <h2 class="text-xl font-bold mb-4">About Me</h2>
              <p class="text-gray-700 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae tortor ullamcorper,
                ut vestibulum velit convallis. Aenean posuere risus non velit egestas suscipit. Nunc finibus vel ante
                id euismod. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
                Aliquam erat volutpat. Nulla vulputate pharetra tellus, in luctus risus rhoncus id.
              </p>
  
             

  


              <div class="bg-white shadow rounded-lg p-6">
  <h2 class="text-xl font-bold mb-4">Create a Post</h2>
  <form @submit.prevent="submitPost" class="space-y-4">
    <textarea
      v-model="newPostContent"
      rows="4"
      placeholder="What's on your mind?"
      class="w-full border rounded-lg p-3 resize-none"
      required
    ></textarea>
    
    <input
      type="file"
      accept="image/*"
      @change="onPostImageChange"
    />
    
    <button
      type="submit"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Publish
    </button>
  </form>
</div>





  <div class="space-y-10">

<!-- Friends Section -->
<div class="bg-white shadow rounded-lg p-6">
  <h2 class="text-xl font-bold mb-4">My Friends</h2>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
    <div
      v-for="friend in friends"
      :key="friend.id"
      class="flex flex-col items-center text-center"
    >
      <img
        :src="friend.avatar"
        :alt="friend.name"
        class="w-50 h-50 mb-2 object-cover"
      />
      <span class="text-gray-800 font-medium">{{ friend.name }}</span>
    </div>
  </div>
</div>


 


<!-- Uploaded Pictures Section -->
<div class="bg-white shadow rounded-lg p-6">
  <h2 class="text-xl font-bold mb-4">My Uploaded Pictures</h2>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
    <div
      v-for="(photo, index) in uploadedPhotos"
      :key="index"
      class="relative"
    >
      <img
        :src="photo"
        class="w-full h-40 object-cover rounded-lg border"
      />
    </div>
  </div>
</div>

<!-- Upload Form -->
<div class="bg-white shadow rounded-lg p-6">
  <h2 class="text-xl font-bold mb-4">Upload New Picture</h2>
  <form @submit.prevent="handleUpload">
    <input
      type="file"
      accept="image/*"
      @change="onFileChange"
      class="mb-4"
    />
    <button
      type="submit"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Upload
    </button>
  </form>
</div>

</div>


            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  



 

  <script>
  export default {
  data() {
    return {
      friends: [
        { id: 1, name: "Alice", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
        { id: 2, name: "Bob", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
        { id: 3, name: "Charlie", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
        { id: 4, name: "Diana", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
        { id: 5, name: "Eli", avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
        { id: 6, name: "Fiona", avatar: "https://randomuser.me/api/portraits/women/6.jpg" },
      ],
      uploadedPhotos: [
        "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        "https://source.unsplash.com/random/400x300?sig=1",
        "https://source.unsplash.com/random/400x300?sig=2",
        "https://source.unsplash.com/random/400x300?sig=3",
        "https://source.unsplash.com/random/400x300?sig=4"
      ],
      selectedFile: null,
    };
  },
  methods: {
    onFileChange(e) {
      this.selectedFile = e.target.files[0];
    },
    handleUpload() {
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedPhotos.unshift(e.target.result);
        };
        reader.readAsDataURL(this.selectedFile);
        this.selectedFile = null;
      }
    },
  },
};
  </script>