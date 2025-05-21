const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const User = require('../model/User');
router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/me', authController.protect, (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user
    }
  });
});


 
router.get('/all-users', async (req, res) => {
  try {
     const users = await User.find();
     res.status(200).json({
       status: 'success',
       data: {
         users,
       },
     });
   } catch (err) {
     res.status(404).json({
       status: 'fail',
       message: err,
     });
   }

});


module.exports = router;







