const express = require("express");
const router = express.Router();
const Review = require('../models/Review');
const Item = require("../models/Item");
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

router.get('/getReviews/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        console.log(itemId);

        const item = await Item.findOne({ _id: itemId });

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        console.log(item.name);

        // Assuming you have a field in Review model like 'item' that references Item model
        const reviews = await Review.find({ productId: item })
            .populate({
                path: 'user',
                select: 'email',
            })
            .select('text type');

        console.log(reviews);

        console.log(reviews);

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;