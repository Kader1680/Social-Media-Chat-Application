<template>
  <div class="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
    <h2 class="text-2xl font-bold mb-4">Edit Post</h2>

    <form @submit.prevent="updatePost" enctype="multipart/form-data">
      <div class="mb-4">
        <label for="content" class="block font-medium">Content</label>
        <textarea v-model="form.content" id="content" rows="4" class="w-full border p-2 rounded"></textarea>
      </div>

      <div class="mb-4">
        <label class="block font-medium">Current Media</label>
        <div v-if="form.media">
          <img v-if="isImage(form.media)" :src="form.media" class="w-full max-h-64 rounded" />
          <video v-else controls class="w-full max-h-64 rounded">
            <source :src="form.media" />
          </video>
        </div>
      </div>

      <div class="mb-4">
        <label for="newMedia" class="block font-medium">Change Media</label>
        <input type="file" id="newMedia" @change="handleFileChange" />
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Update Post
      </button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const postId = route.params.id;

    const form = ref({
      content: '',
      media: '',
    });

    const file = ref(null);

    const isImage = (path) => {
      return path.match(/\.(jpeg|jpg|png|gif)$/i);
    };

    const handleFileChange = (e) => {
      file.value = e.target.files[0];
    };

    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3000/post/${postId}`);
        const data = await res.json();
        form.value.content = data.content;
        form.value.media = data.media;
      } catch (err) {
        console.error(err);
      }
    };

    const updatePost = async () => {
      const formData = new FormData();
      formData.append('content', form.value.content);
      if (file.value) {
        formData.append('image', file.value);
      }

      try {
        const res = await fetch(`http://localhost:3000/post/${postId}`, {
          method: 'PUT',
          body: formData,
        });

        if (res.ok) {
          alert('Post updated');
          router.push('/');
        } else {
          alert('Failed to update post');
        }
      } catch (err) {
        console.error(err);
        alert('Error updating post');
      }
    };

    onMounted(fetchPost);

    return { form, isImage, handleFileChange, updatePost };
  },
};
</script>

<style scoped>
/* Optional styling */
</style>
