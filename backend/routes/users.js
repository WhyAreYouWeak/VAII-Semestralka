const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/getUserProfile/:id', async (req, res ) => {
    const userId = req.params.id;
    console.log("Get user profile id je " + userId);
    const user = await  User.findById(userId);
    console.log("Get user profile user je " + user.email);
    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }
    res.status(200).json(user);
});

module.exports = router;