const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const Profile = require("../model/Profile")

router.post("/profil", async (req, res) => {
    const {
        first_name,
        last_name,
        bio,
        address,
        phone,
        home,
        workplace,
        education,
        id_user
    } = req.body;

    try {
        if (!first_name || !id_user) {
            return res.status(400).json({
                message: "first_name and id_user are required"
            });
        }

        const user_profile = new Profile({
            first_name,
            last_name,
            bio,
            address,
            phone,
            home,
            workplace,
            education,
            id_user,
        });

        await user_profile.save();

        res.status(201).json(user_profile);
        console.log(user_profile);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
=======
const Profile = require('../model/Profil');
const User = require('../model/User');

// GET profile by ID
router.get("/profil/:id_profile", async (req, res) => {
  const id_profile = req.params.id_profile;
  console.log("ID from params:", id_profile);

  try {
    const profile = await User.findById(id_profile);
    if (!profile) return res.status(404).send("Profile not found");
    res.json(profile);
   
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
>>>>>>> 94099571f81f307fa066ffb7d8d6efe8fd7b58c6
});

// POST create profile
router.post("/profil", async (req, res) => {
  try {
    const { datebirth, school, home, live, work, gender, image, id_user } = req.body;

<<<<<<< HEAD
router.get("/profil/:id_user", async (req, res) => {
    try {
        const profile = await Profile.findOne({ id_user: req.params.id_user });
        console.log('profile' , profile)
        if (!profile) {
            return res.status(404).send("Profile not found");
        }

        res.json(profile);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;  
=======
    const existing = await Profile.findOne({ id_user });
    if (existing) {
      return res.status(400).send("Profile already exists for this user.");
    }

    const newProfile = new Profile({
      datebirth,
      school,
      home,
      live,
      work,
      gender,
    //   image,
      id_user
    });

    await newProfile.save();
    res.status(201).send("Profile created successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT update profile
router.put("/profil/:id_profile", async (req, res) => {
  try {
    const id_profile = req.params.id_profile;
    const updateData = req.body;

    const updatedProfile = await Profile.findByIdAndUpdate(
      id_profile,
      updateData,
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).send("Profile not found");
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
>>>>>>> 94099571f81f307fa066ffb7d8d6efe8fd7b58c6
