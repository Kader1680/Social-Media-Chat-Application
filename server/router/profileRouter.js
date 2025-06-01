const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.get("/profil", async (req, res) => {
    
   

    try {
        const user_profil = await User.find({}); 
        if (!user_profil) {
            return res.status(404).send("User not found");
        }
        res.render("profil", { user_profil });
        console.log(user_profil);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



module.exports = router;


