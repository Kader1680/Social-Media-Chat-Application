<style scoped>
img, video {
  transition: all 0.3s ease-in-out;
}

.reactions{
 justify-content: space-between;
}
.reactions div .fa-comment{
  margin-right: 1rem;
}
.items li{
  color: #004182;
}
.items li i{
  color: black;
}
</style>
<template>
<main class="max-w-7xl mx-auto flex flex-col md:flex-row mt-6 px-4 gap-6">
    <aside class="w-full md:w-1/4 hidden md:block">
      <div class="bg-gray-100  rounded-lg p-4 shadow-sm">
        <h2 class="font-semibold mb-3">Friends</h2>
        <ul class="space-y-2">
          <li class="flex items-center gap-2"><div class="w-8 h-8 bg-gray-300 rounded-full"></div>ahmed li</li>
          <li class="flex items-center gap-2"><div class="w-8 h-8 bg-gray-300 rounded-full"></div>meissa lane</li>
          <li class="flex items-center gap-2"><div class="w-8 h-8 bg-gray-300 rounded-full"></div>fouzi abdelrahim</li>
        </ul>
      </div>
    </aside>


    

    <section class="flex-1 space-y-6">



    <form  @submit.prevent="submitPost" class="max-w-2xl mx-auto p-6 bg-gray-100  rounded-2xl shadow space-y-6">
    <h2 class="text-2xl font-bold text-gray-800">Create a New Post</h2>

    <textarea
      v-model="content"
      placeholder="What's on your mind?"
      class="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      rows="4"
    ></textarea>





    <div>
      <label for="media" class="block text-gray-600 font-medium mb-2">Upload Image or Video</label>
      <input
        name="media"
        type="file"
        accept="image/*,video/*"
        @change="handleFileUpload"
        class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#00418278] file:text-[#004182] hover:file:bg-blue-200"
      />
    </div>  

    <div v-if="previewUrl" class="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      <img v-if="isImage" :src="previewUrl" class="w-full max-h-80 object-cover" />
      <video v-else controls class="w-full max-h-80">
        <source :src="previewUrl" />
        Your browser does not support the video tag.
      </video>
    </div>

    <div class="text-right">
      <button
        type="submit"
        class="bg-[#004182] text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
      >
        Post
      </button>
    </div>
  </form>






      <div v-for="(post, index) in allposts" :key="index" class="p-4 bg-gray-100 rounded-xl shadow">
          <div style="justify-content: space-between;" class="flex justify-content-between">
            <h3>{{ post.id_user }}</h3>
            <div class="space-x-2">
                 <router-link :to="`/post/edit/${post._id}`" class="text-[#004182] hover:underline">Edit</router-link>
                 <button @click="deletePost(post._id)" class="text-red-500 hover:underline">Delete</button>
                 
            </div>
          </div>
          <p class="text-gray-800 mb-2">{{ post.content }} </p>

          <div v-if="post.media">
        
          
            <img v-if="isImage(post.media)" :src="`http://localhost:3000${post.media}`" />

            <video
              v-else
              controls
              class="w-full max-h-80 rounded-lg"
            >
              <source :src="post.media" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div class="reactions flex align-items-center justify-content-between">
            <div>
                
     
                  
              <i @click="likePost(post._id)"  style="font-size: 25px;" class="fa-solid fa-thumbs-up"></i>

              <i style="font-size: 25px; margin-right: 1rem;" class="fa-solid fa-comment"></i>
            </div>
            <i style="font-size: 25px;"  class="fa-solid fa-share"></i>
          </div>  

  
    </div>





    </section>



     <aside class="w-full md:w-1/4 hidden md:block">
      <div class="bg-gray-100  rounded-lg p-4 shadow-sm">
        <h2 class="font-semibold mb-3"></h2>
        <ul class="space-y-2 items">
          <li class="flex items-center gap-2"><i class="fa-solid fa-bookmark"></i> saved items</li>
          <li class="flex items-center gap-2"><i class="fa-brands fa-youtube"></i> reels & vedio</li>
          <li class="flex items-center gap-2"><i class="fa-solid fa-user-group"></i>groups</li>
          <li class="flex items-center gap-2"><i class="fa-solid fa-store"></i>marketspace</li>
          <li class="flex items-center gap-2"><i class="fa-solid fa-gear"></i>setting</li>
        </ul>
      </div>
    </aside>
    
  </main>


</template>


<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue';
const content = ref('')
const media = ref(null)

const submitPost = async () => {
  try {
    const formData = new FormData();
    formData.append('content', content.value);
    formData.append('id_user', JSON.parse(localStorage.getItem('user')).id);

    if (media.value) {
      formData.append('image', media.value); // key must match multer's 'image'
    }

    const res = await axios.post('http://localhost:3000', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    
  } catch (err) {
    console.error(err.response?.data?.message || err.message);
  }
};

const handleFileUpload = (event) => {
  media.value = event.target.files[0];

  if (media.value) {
    previewUrl.value = URL.createObjectURL(media.value);
    isImage.value = media.value.type.startsWith("image/");
  }
};



const isImage = (media) => {
  return media && (media.endsWith(".jpg") || media.endsWith(".png") || media.endsWith(".jpeg") || media.endsWith(".gif"));
};


const allposts = ref([]);

const fetchPosts = async () => {
  try {
    const response = await axios.get('http://localhost:3000');
    allposts.value = response.data;
    console.log(allposts.value);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

onMounted(() => {
  fetchPosts();
});

const deletePost = async (postId) => {
  const confirmDelete = confirm("Are you sure you want to delete this post?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:3000/post/${postId}`);
    allposts.value = allposts.value.filter(post => post._id !== postId);
  } catch (error) {
    console.error("Error deleting post:", error);
    alert("Failed to delete the post.");
  }
};

const likePost = async (postId) => {
  try {
    const userId = JSON.parse(localStorage.getItem('user')).id;

    const res = await axios.post('http://localhost:3000/', {
      id_post: postId,
      id_user: userId,
    });

    console.log("Liked successfully", res.data.post);
  } catch (err) {
    console.error("Error liking post:", err.response?.data?.message || err.message);
  }
};




</script>
