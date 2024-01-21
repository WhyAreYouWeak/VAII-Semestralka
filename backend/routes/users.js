const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {hash} = require("bcrypt");

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

router.put('/updateUserPassword/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        console.log("Update user password id je " + userId);

        // Ensure the new password is provided
        if (!req.body.newPassword) {
            return res.status(400).json({ error: 'New password is required' });
        }

        // Ensure the confirmed password is provided
        if (!req.body.confirmPassword) {
            return res.status(400).json({ error: 'Confirmed password is required' });
        }

        // Check if the new password and confirmed password match
        if (req.body.newPassword !== req.body.confirmPassword) {
            return res.status(400).json({ error: 'New password and confirmed password do not match' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

        // Update the user's password in the database
        const result = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });

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