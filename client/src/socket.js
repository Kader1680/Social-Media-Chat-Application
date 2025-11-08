// socket.js (Frontend)
import { io } from "socket.io-client";

const user = JSON.parse(localStorage.getItem('user')) || null;
const userId = user?._id || user?.id || null;

if (!userId) {
  console.warn('No user ID found in localStorage — socket will connect without auth.');
}

const socketOptions = {
  withCredentials: true,
  transports: ['websocket', 'polling']
};
if (userId) socketOptions.auth = { userId };

const socket = io('http://localhost:3000', socketOptions);

socket.on('connect', () => {
  console.log('Connected to socket server with ID:', socket.id);
  if (userId) {
    socket.emit('join', userId);
  }
});

socket.on('disconnect', () => {
  console.log('Disconnected from socket server');
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error && error.message ? error.message : error);
});

if (userId) {
  socket.connect();
}

export default socket;