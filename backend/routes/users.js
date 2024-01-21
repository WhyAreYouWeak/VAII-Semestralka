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

router.put('/updateUserProfile/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        console.log("Update user profile id je " + userId);

        const updatedUser = {
            meno: req.body.meno,
            priezvisko: req.body.priezvisko,
            cislo: req.body.cislo,
            ulica: req.body.ulica,
            psc: req.body.psc,
            mesto: req.body.mesto,
        };

        // Update the user in the database
        const result = await User.findByIdAndUpdate(userId, updatedUser, { new: true });

        if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;