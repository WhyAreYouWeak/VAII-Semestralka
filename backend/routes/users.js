const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {hash} = require("bcrypt");

router.get('/getUserProfile', async (req, res ) => {
    const userId = req.user;
    console.log("Get user profile id je " + userId);
    const user = await  User.findById(userId);
    console.log("Get user profile user je " + user.email);
    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }
    res.status(200).json(user);
});

router.put("/updateUserProfile", async (req, res) => {
    try {
        const userId = req.user._id;
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

router.put('/updateUserPassword', async (req, res) => {
    try {
        const userId = req.user;
        if (!req.body.oldPassworcd) {
            return res.status(200).json('Zadajte stare heslo ' );
        }

        if (!req.body.newPassword) {
            return res.status(200).json('Zadajte nove heslo' );
        }


        if (!req.body.confirmPassword) {
            return res.status(200).json('Zadajte potvrdenie hesla' );
        }


        if (req.body.newPassword !== req.body.confirmPassword) {
            return res.status(200).json('Hesla sa nezhoduju' );
        }

        const oldPasswordMatch = await bcrypt.compare(req.body.oldPassworcd, userId.password);

        if (!oldPasswordMatch) {
            return res.status(200).json( 'Stare heslo sa nezhoduje' );
        }

        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);


        const result = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });

        if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json("Heslo uspesne zmenene");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;