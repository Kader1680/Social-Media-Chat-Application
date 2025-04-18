const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const authRoutes = require('./router/authRouter');
const connectDB = require("./conf/db")
connectDB();
const app = express();
const server = http.createServer(app);

// // Enable CORS to allow frontend to connect
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173", // Allow frontend connection
//         methods: ["GET", "POST"]
//     }   
// });



// io.on('connection', (socket) => {
//     console.log('New client connected:', socket.id);

//     socket.on('message', (message) => {
//         console.log('Message received:', message);
//         io.emit('message', message);  // emit on the all client open the connection

//     });

//     socket.on('disconnect', () => {
//         console.log('Client disconnected:', socket.id);
//     });
// });

 
require('dotenv').config();


// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // allow requests from your Vue app
  credentials: true               // if you're sending cookies/auth headers
}));

// Middleware
app.use(express.json());

// Routes
app.use('/', authRoutes);

// Example of a protected route
const { protect } = require('./controller/authController');

app.get('/api/profile', protect, (req, res) => {
  res.status(200).json({
    message: 'You are logged in!',
    user: req.user
  });
});








server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


