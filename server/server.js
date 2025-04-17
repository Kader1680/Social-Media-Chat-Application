const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const connectDB = require("./conf/db")
connectDB();
const app = express();
const server = http.createServer(app);

// Enable CORS to allow frontend to connect
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow frontend connection
        methods: ["GET", "POST"]
    }   
});


const mongoose = require("mongoose")

const url = 'mongodb+srv://root:0000@medtracker.qiq8b.mongodb.net/medDB';
mongoose.connect(url)
.then(()=>{
  console.log("connected with mongodb")
})
.catch((err)=>{
  console.log("error connected :  ", err)
})



io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('message', (message) => {
        console.log('Message received:', message);
        io.emit('message', message);  // emit on the all client open the connection

    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});







server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


