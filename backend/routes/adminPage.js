const express = require('express');
const router = express.Router();
const Item = require("../models/Item");

router.post('/addProduct', async function(req, res) {
    try {
        const product = req.body;
        if (product._id) {
            // If product has _id, update existing product
            await Item.findByIdAndUpdate(product._id, product);
            res.status(200).send("Produkt uspesne upraveny");
        } else {
            const item = new Item({
                name: product.name,
                author: product.author,
                price: product.price,
                ISBN: product.ISBN,
                binding: product.binding,
                weight: product.weight,
                language: product.language,
                publisher: product.publisher,
                imageURL: product.imageURL
            });
            await item.save();
            res.status(201).send("Produkt uspesne pridany");
        }
    } catch (err) {
        if (err.code === 11000) {
            console.error('PK uz existuje:', err.message);
            res.status(400).send('Toto ISBN uz existuje');
        } else {
            console.error(err);
            res.status(500).send('Nepodarilo sa upravit/pridat');
        }
    }
});

router.put('/products/:id', async function(req, res) {
    try {
        const product = req.body;
        const productID = req.params.id;
        // If product has _id, update existing product
        await Item.findByIdAndUpdate(productID, product);
        res.status(200).send("Produkt uspesne upraveny");
    } catch (err) {
        console.log(err);
        res.status(500).send('Nepodarilo sa upravit');
    }
});

router.get('/products', async function(req, res) {
    try {
        const products = await Item.find();
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Nepodarilo sa nacitat produkty ');
    }
});

router.get('/products/:id', async function (req, res) {
    try {
        const productId = req.params.id;
        const product = await Item.findById(productId);
        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send('Nepodarilo sa nacitat parametre produktu');
    }
});

router.delete('/products/:id', async function(req, res) {
    try {
        const productId = req.params.id;
        await Item.findByIdAndDelete(productId);
        res.status(200).send("Produkt zmazany uspesne");
    } catch (err) {
        console.log(err);
        res.status(500).send('Nepodarilo sa zmazat produkt');
    }
});

module.exports = router;