const express = require('express');
const router = express.Router();
const Profile = require('../model/Profile');
const User = require('../model/User');
});

// Get profile by user ID
router.get("/profil/:id_user", async (req, res) => {
    try {
        const profile = await Profile.findOne({ id_user: req.params.id_user });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Create or update profile
router.post("/profil", async (req, res) => {
    try {
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

        if (!id_user) {
            return res.status(400).json({
                message: "id_user is required"
            });
        }

        // Check for existing profile
        let profile = await Profile.findOne({ id_user });

        if (profile) {
            // Update existing profile
            profile.first_name = first_name || profile.first_name;
            profile.last_name = last_name || profile.last_name;
            profile.bio = bio || profile.bio;
            profile.address = address || profile.address;
            profile.phone = phone || profile.phone;
            profile.home = home || profile.home;
            profile.workplace = workplace || profile.workplace;
            profile.education = education || profile.education;
        } else {
            // Create new profile
            profile = new Profile({
                first_name,
                last_name,
                bio,
                address,
                phone,
                home,
                workplace,
                education,
                id_user
            });
        }

        await profile.save();
        res.status(201).json(profile);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update profile by ID
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
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json(updatedProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
