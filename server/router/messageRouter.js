const express = require('express');
const router = express.Router();
const Chat = require('../model/Chat');
const User = require('../model/User');

router.post('/chat/:friendId', async (req, res)=>{
   try {
    const { sender, receiver, content } = req.body;
    const newMessage = new Chat({ sender, receiver, content });
    await newMessage.save();      
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error); // you had `err`, should be `error`
    res.status(500).json({ message: 'Error sending message' });
  }
})

 

router.get('/chat/:friendId', async (req, res) => {
  const userId = req.headers['x-user-id'];
  console.log(userId);
  const friendId = req.params.friendId;
  console.log(friendId);

  try {
    const messages = await Chat.find({
      $or: [
        { sender: userId, receiver: friendId },
        { sender: friendId, receiver: userId }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get("/chat", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error("Error fetching users from DB:", err.message);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;


