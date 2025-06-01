const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const authRoutes = require('./router/authRouter');
const messageRouter = require('./router/messageRouter');
const profileRouter = require('./router/profileRouter');
const postRouter = require('./router/postRouter');
const connectDB = require("./conf/db")
connectDB();
const path = require('path');

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

// Example of a protected route
const { protect } = require('./controller/authController');

// app.get('/profile', protect, (req, res) => {
//   res.status(200).json({
//     message: 'You are logged in!',
//     user: req.user
//   });
// });


// Routes
app.use('/', authRoutes);

app.use('/', messageRouter);


app.use('/', profileRouter);
app.use('/', postRouter);
 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


