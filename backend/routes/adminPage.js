const express = require('express');
const router = express.Router();
const Item = require("../models/Item");

router.post('/addProduct', async function(req, res) {
    try {
        const product = req.body;
        const item = new Item({
            name: product.name,
            price: product.price,
            ISBN: product.ISBN,
            binding: product.binding,
            weight: product.weight,
            language: product.language,
            publisher: product.publisher,
            imageURL: product.imageURL
        });
        await item.save();
        res.status(201).send("produkt uspesne pridany");
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error while adding item');
    }

});
module.exports = router;