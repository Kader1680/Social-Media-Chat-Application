// messageRouter.js (Backend)
const express = require('express');
const router = express.Router();
const Chat = require('../model/Chat');
const User = require('../model/User');
const { protect } = require('../controller/authController');

router.post('/chat/:friendId', protect, async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    
    if (!sender || !receiver || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const newMessage = new Chat({ sender, receiver, content });
    await newMessage.save();
    
    // Format response to match frontend expectations
    const response = {
      _id: newMessage._id,
      senderId: newMessage.sender,
      receiverId: newMessage.receiver,
      message: newMessage.content,
      createdAt: newMessage.createdAt
    };
    
    res.status(201).json(response);
  } catch (error) {
    console.error('Error in POST /chat/:friendId:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

// GET - Fetch messages between two users
router.get('/chat/:friendId', protect, async (req, res) => {
  try {
    // Get userId from authenticated user
    const userId = req.user._id;
    const friendId = req.params.friendId;
    
    console.log('Fetching messages between:', userId, 'and', friendId);

    const messages = await Chat.find({
      $or: [
        { sender: userId, receiver: friendId },
        { sender: friendId, receiver: userId }
      ]
    }).sort({ createdAt: 1 });

    console.log('Found messages:', messages.length);
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET - Fetch all users (friends list)
router.get("/chat", protect, async (req, res) => {
  try {
    console.log("Fetching users for request by user:", req.user?._id);
    const users = await User.find({ _id: { $ne: req.user._id } }).select('-password');
    res.json(users);
  } catch (err) {
    console.error("Error fetching users from DB:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;