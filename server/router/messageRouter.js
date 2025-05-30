const express = require('express');
const router = express.Router();

const Chat = require('../model/Chat');

const User = require('../model/User');

router.post('/', async (req, res)=>{
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



// router.get('/:userId',  async (req, res) => {
//   try {
//     const otherUserId = req.params.userId;
//     const currentUserId = req.user.id;

//     const messages = await Chat.find({
//       $or: [
//         { senderId: currentUserId, receiverId: otherUserId },
//         { senderId: otherUserId, receiverId: currentUserId }
//       ]
//     }).sort({ createdAt: 1 }); // oldest first

//     res.status(200).json(messages);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error getting messages' });
//   }
// });



 
router.get('/chat/:friendId', async (req, res) => {
  const userId = "683971d102f007b897b559ca";  
  const friendId = "680220318b56fa85cbd9611d";

  try {
    const messages = await Chat.find({
      $or: [
        { senderId: userId, receiverId: friendId },
        { senderId: friendId, receiverId: userId }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add this to your /chat route
router.get("/chat", async (req, res) => {
  try {
    // Exclude the current user from the list
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error("Error fetching users from DB:", err.message);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;


