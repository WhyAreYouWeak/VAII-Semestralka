const express = require('express');
const router = express.Router();
const Order = require('../models/Order')

router.post('/createOrder/:id', async (req, res) => {
    const itemId = req.params.id;
    const user = req.user;
    console.log("odrder item id is " + itemId);
    console.log("user id is " + user);
    try {
        const order = new Order({user: user, productId: itemId })
        await order.save();
        res.status(200).json({message: "Produkt uspesne objednany"});
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }

});

module.exports = router;