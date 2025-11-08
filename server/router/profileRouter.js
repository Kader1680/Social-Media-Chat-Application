const express = require('express');
const router = express.Router();
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
});


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