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

router.get('/getOrders', async (req, res) => {
    const userId = req.user;
    try {
        let orders
        if (userId.role === "admin") {
             orders = await Order.find().populate('productId');
        } else {
             orders = await Order.find({ user: userId }).populate('productId');
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/getOrder/:id', async (req, res) => {
    const orderId = req.params.id;

    try {
        const order = await Order.findById(orderId).populate('productId' ).populate('user');
        console.log("fetching oreder - -----------------------------------------")
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        console.log(order);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;