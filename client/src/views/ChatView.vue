<template>
  <div class="flex h-[85vh] bg-white rounded-lg shadow overflow-hidden">
    <!-- Sidebar with Users -->
    <aside class="w-1/3 border-r p-4 overflow-y-auto">
      <h2 class="font-bold mb-2 text-lg">Conversations</h2>
      <ul>
        <li
          v-for="user in users"
          :key="user.id"
          @click="selectConversation(user)"
          :class="[
            'p-2 rounded cursor-pointer',
            selectedUser?.id === user.id ? 'bg-[#00006d] text-white' : 'hover:bg-gray-100'
          ]"
        >
          {{ user.name }}
        </li>
      </ul>
    </aside>

    <!-- Main Chat Area -->
    <main class="w-2/3 p-4 flex flex-col">
      <div v-if="selectedUser" class="flex-1 overflow-y-auto space-y-2 mb-4">
        <h3 class="font-semibold text-xl border-b pb-2 mb-2">
          Chat with {{ selectedUser.name }} (ID: {{ selectedUser.id }})
        </h3>
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="msg.sender_id === authId ? 'text-right' : 'text-left'"
        >
          <div
            :class="[
              'inline-block px-4 py-2 rounded-lg max-w-[60%]',
              msg.sender_id === authId
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-900'
            ]"
          >
            {{ msg.text }}
          </div>
        </div>
      </div>

      <!-- Input -->
      <form @submit.prevent="sendMessage" v-if="selectedUser" class="mt-auto flex gap-2">
        <input
          v-model="messageText"
          type="text"
          placeholder="Type your message..."
          class="flex-1 border rounded-lg px-4 py-2"
        />
        <button class="bg-[#00006d] text-white px-4 py-2 rounded hover:bg-[#00006d]">
          Send
        </button>
      </form>
    </main>
  </div>
</template>


<script>
export default {
  data() {
    return {
      authId: 1, // Replace with actual authenticated user ID
      users: [
        { id: 2, name: 'Alice' },
        { id: 3, name: 'Bob' },
        { id: 4, name: 'Charlie' }
      ],
      selectedUser: null,
      messages: [],
      messageText: "",
      socket: null
    };
  },
  methods: {
    selectConversation(user) {
      this.selectedUser = user;
      this.messages = []; // You might fetch chat history here

      // You can emit a "join" or "subscribe" event here if needed
    },
    connectWebSocket() {
      this.socket = new WebSocket("ws://localhost:6001"); // Example endpoint

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (
          this.selectedUser &&
          (data.sender_id === this.selectedUser.id || data.receiver_id === this.selectedUser.id)
        ) {
          this.messages.push(data);
        }
      };
    },
    sendMessage() {
      if (this.messageText.trim() === "" || !this.socket || !this.selectedUser) return;

      const messagePayload = {
        text: this.messageText,
        sender_id: this.authId,
        receiver_id: this.selectedUser.id
      };

      this.socket.send(JSON.stringify(messagePayload));
      this.messages.push(messagePayload);
      this.messageText = "";
    }
  },
  mounted() {
    this.connectWebSocket();
  }
};
</script>
