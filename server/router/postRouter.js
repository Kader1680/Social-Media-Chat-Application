const express = require('express');
const router = express.Router();
const Post = require('../model/Post');

const multer = require('multer');
 
// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });


router.post('/', upload.single('image'), async (req, res) => {
  try {
    const newPost = new Post({
      content: req.body.content,
      media: `/uploads/${req.file.filename}`, // store path
    });

    await newPost.save();
    res.status(201).json({ status: 'success', post: newPost });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});


router.get('/', async (req, res)=>{
   try {
    const allposts= await Post.find();
    // const user = await User.findById(allposts.id_user);
    res.status(200).json(allposts);
    // res.render(user)
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Error fetch post' });
  }
})

module.exports = router;


