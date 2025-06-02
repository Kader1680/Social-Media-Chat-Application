    <form @submit.prevent="submitComment(post._id, index)" class="mt-4">
  <input
    v-model="post.newComment"
    type="text"
    placeholder="Write a comment..."
    class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
  />
  <button
    type="submit"
    class="mt-2 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
  >
    Comment
  </button>
</form>

<ul class="mt-2 space-y-1 text-sm text-gray-700">
  <li v-for="(comment, i) in post.comments" :key="i" class="border-b pb-1">
    <strong>{{ comment.username || 'User' }}:</strong> {{ comment.text }}
  </li>
</ul>
