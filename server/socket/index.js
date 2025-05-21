// handel all the logic about the socket protocol
const express = require("express")
const app = express()
const socketio = require('socket.io');
const http = require('http');
const server = http.createServer(app); 
const io = socketio(server);
const chatshema = require("../models/chatSchema");

io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('sendmessage', (message) => {
    const message = new chatshema(message);
    message.save().then(() => {
        socket.to(message.receiverId).emit('newMessage', message);
        socket.emit('newMessage', message);
    });
    });
    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
});







