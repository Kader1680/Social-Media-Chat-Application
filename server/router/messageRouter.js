const express = require('express');
const router = express.Router();

const Chat = require('../model/Chat');

 
route.post('/', async (req, res)=>{
    try {
        const {receiver, conent } = req.body;

        const newMessage = new  Chat({sender : req.user.id, receiver, content});
        await newMessage.save();

        
        res.status(201).json(newMessage);
    } catch (error) {
         console.error(err);
         res.status(500).json({ message: 'Error sending message' });
    }
})



router.get('/:userId', authenticateUser, async (req, res) => {
  try {
    const otherUserId = req.params.userId;
    const currentUserId = req.user.id;

    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: currentUserId }
      ]
    }).sort({ createdAt: 1 }); // oldest first

    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting messages' });
  }
});

module.exports = router;

