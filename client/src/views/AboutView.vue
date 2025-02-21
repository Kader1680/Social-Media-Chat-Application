<template>
  <div class="chat-container">
    <!-- Sidebar -->
    <div class="sidebar">
      <h2>Messages</h2>
      <ul class="contacts">
        <li class="contact">
          <img src="https://i.pravatar.cc/50" alt="User" />
          <div class="contact-info">
            <p class="name">John Doe</p>
            <p class="last-message">Hey, how are you?</p>
          </div>
        </li>
        <li class="contact">
          <img src="https://i.pravatar.cc/51" alt="User" />
          <div class="contact-info">
            <p class="name">Jane Smith</p>
            <p class="last-message">Are you available?</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- Chat Area -->
    <div class="chat-area">
      <div class="chat-header">
        <img src="https://i.pravatar.cc/52" alt="User" />
        <h2>John Doe</h2>
      </div>

      <div class="chat-messages">
        <div class="message received">
          <p>Hello! How are you?</p>
        </div>
        <div class="message sent">
          <p>I'm good, how about you?</p>
        </div>
      </div>

      <div class="chat-input">
        <input type="text" placeholder="Type a message..." />
        <button>Send</button>
      </div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Chat Container */
.chat-container {
  display: flex;
  width: 90%;
  max-width: 1000px;
  height: 90vh;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Sidebar */
.sidebar {
  width: 30%;
  background: #ffffff;
  border-right: 1px solid #ddd;
  padding: 15px;
}

.sidebar h2 {
  margin: 0;
  font-size: 18px;
  margin-bottom: 15px;
}

.contacts {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: background 0.3s;
}

.contact:hover {
  background: #f0f0f0;
}

.contact img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.contact-info {
  flex-grow: 1;
}

.contact-info .name {
  font-weight: bold;
  margin: 0;
}

.contact-info .last-message {
  font-size: 12px;
  color: gray;
  margin: 0;
}

/* Chat Area */
.chat-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #007bff;
  color: white;
}

.chat-header img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

/* Chat Messages */
.chat-messages {
  flex-grow: 1;
  padding: 15px;
  overflow-y: auto;
  background: #f9f9f9;
}

.message {
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.message.received {
  background: #e0e0e0;
  align-self: flex-start;
}

.message.sent {
  background: #007bff;
  color: white;
  align-self: flex-end;
}

/* Chat Input */
.chat-input {
  display: flex;
  padding: 10px;
  background: #fff;
  border-top: 1px solid #ddd;
}

.chat-input input {
  flex-grow: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #f0f0f0;
  outline: none;
}

.chat-input button {
  padding: 10px 15px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
}

/* Responsive Design */
@media (max-width: 768px) {
  .chat-container {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    height: 200px;
    overflow-y: auto;
  }
  .chat-area {
    height: calc(100vh - 200px);
  }
}
</style>
