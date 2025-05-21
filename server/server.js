const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const authRoutes = require('./router/authRouter');
const connectDB = require("./conf/db")
connectDB();
const app = express();
const server = http.createServer(app);
require('dotenv').config();
// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true             
}));

// Middleware
app.use(express.json());

// Routes
app.use('/', authRoutes);
 
 
// Example of a protected route
const { protect } = require('./controller/authController');

app.get('/profile', protect, (req, res) => {
  res.status(200).json({
    message: 'You are logged in!',
    user: req.user
  });
});



// const messageRoutes = require('./router/messageRouter');
// app.use('/messages', messageRoutes);










server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


