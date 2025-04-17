<template>
    <div class="chat-container">
      <div class="chat-box s">
        <div v-for="(message, index) in messages" :key="index" class="message">
          {{ message }}
        </div>
      </div>
      
      <div class="input-container">
        <input 
          v-model="newMessage" 
          placeholder="Type a message..."
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage" :disabled="!newMessage.trim()">Send</button>
      </div>
    </div>
  </template>
  
  <script>
  import socket from '../socket';
  
  export default {
    data() {
      return {
        messages: [],
        newMessage: ''
      };
    },
    created() {
      socket.on('message', (message) => {
        this.messages.push(message);
      });
    },
    methods: {
      sendMessage() {
        if (this.newMessage.trim()) {
          socket.emit('message', this.newMessage);
          this.newMessage = ''; // Clear input after sending
        }
      }
    }
  };
  </script>
  
  <style>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    max-width: 500px;
    margin: auto;
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
  }
  
  .chat-box {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    background: #f9f9f9;
  }
  
  .message {
    padding: 10px;
    background: #e0f7fa;
    margin: 5px 0;
    border-radius: 5px;
  }
  
  .input-container {
    display: flex;
    padding: 10px;
    background: #fff;
    border-top: 1px solid #ccc;
  }
  
  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
  }
  
  button {
    padding: 10px 15px;
    margin-left: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  button:hover:not(:disabled) {
    background: #0056b3;
  }
  </style>
  