const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Enable CORS to allow frontend to connect
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow frontend connection
        methods: ["GET", "POST"]
    }
});

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Receive message from client and broadcast to all
    socket.on('message', (message) => {
        console.log('Message received:', message);
        io.emit('message', message);  // Broadcast to all clients
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Start server on port 3000
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
