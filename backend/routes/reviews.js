const express = require("express");
const router = express.Router();
const Review = require('../models/Review');

router.post('/add-review', async (req, res) => {
    try {
        const { text, productId, type } = req.body;
        console.log(text + " " + productId + " " + type);
        const user = req.user;
        console.log("user " + user);
        const review = new Review({ text, user: user, productId, type });
        await review.save();

        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;