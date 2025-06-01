const express = require('express');
const router = express.Router();
const User = require('../model/User');
const Post = require('../model/Post');

router.post('/', async (req, res)=>{
   try {
    const { content, id_user } = req.body;
    const newpost= new Post({ id_user, content });
    await newpost.save();     

    res.status(201).json(newpost);
    res.redirect("/")
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Error create post' });
  }
})


router.get('/', async (req, res)=>{
   try {
    const allposts= await Post.find();
    res.status(200).json(allposts);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Error fetch post' });
  }
})

module.exports = router;


