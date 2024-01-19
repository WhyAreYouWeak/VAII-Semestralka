const express = require('express');
const router = express.Router();
const Item = require("../models/Item");
const path = require('path');

const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../frontend/public/books");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });
router.post('/addProduct', upload.single('imageFile') ,async function(req, res) {
    try {
        const product = req.body;
        const imageFile = req.file;
        console.log("meno suboru je "  + req.file.filename);
        console.log("id produktu je " + product._id);
        if (imageFile) {
            product.imageURL = `books/${imageFile.filename}`;
        }

        if (product._id) {
            await Item.findByIdAndUpdate(product._id, product);
            res.status(200).send("Produkt uspesne upraveny");
        } else {
            const item = new Item({
                name: product.name,
                author: product.author,
                price: product.price,
                category: product.category,
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
router.post('/products/:id', upload.single('imageFile'), async function(req, res) {
    try {
        const productID = req.params.id;
        const updatedProductInfo = req.body;
        console.log(updatedProductInfo);

        // Check if the product has an image file
        if (req.file) {
            const imageFile = req.file;
            updatedProductInfo.imageURL = `books/${imageFile.filename}`;
        }
        // Update existing product information (excluding image file)
        await Item.findByIdAndUpdate(productID, {
            $set: {
                name: updatedProductInfo.name,
                author: updatedProductInfo.author,
                price: updatedProductInfo.price,
                category: updatedProductInfo.category,
                ISBN: updatedProductInfo.ISBN,
                binding: updatedProductInfo.binding,
                weight: updatedProductInfo.weight,
                language: updatedProductInfo.language,
                publisher: updatedProductInfo.publisher,
                imageURL: updatedProductInfo.imageURL,
            }
        });
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