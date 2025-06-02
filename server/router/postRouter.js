const express = require('express');
const router = express.Router();
const Post = require('../model/Post');

const multer = require('multer');
const Like = require('../model/Like');

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Create a new post
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const newPost = new Post({
      content: req.body.content,
      media: req.file ? `/uploads/${req.file.filename}` : null,
      id_user: req.body.id_user,
    });

    await newPost.save();
    res.status(201).json({ status: 'success', post: newPost });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.find();
    const alllikes = await Like.find();
    res.status(200).json(allPosts).render("likes", {alllikes});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Update post by ID
router.put('/post/:id', upload.single('image'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.content = req.body.content || post.content;
    if (req.file) {
      post.media = `/uploads/${req.file.filename}`;
    }

    await post.save();
    res.status(200).json({ message: 'Post updated', post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

 
router.delete('/post/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




router.post('/', async (req, res) => {
  try {
    const newLike = new Like({
      id_user: req.body.id_user,
      id_post: req.body.id_post,
    });

    // const existingLike = await Like.findOne({
    //   id_user: req.body.id_user,
    //   id_post: req.body.id_post
    // });

    // if (existingLike) {
    //   return res.status(400).json({ message: 'Post already liked by this user' });
    // }


    await newLike.save();
    res.status(201).json({ status: 'success', like: newLike });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});


 

module.exports = router;
