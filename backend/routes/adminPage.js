const express = require('express');
const router = express.Router();
const Item = require("../models/Item");
const Category = require("../models/Category");
const path = require('path');

const multer = require('multer');
const sharp = require("sharp");


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
       // console.log("meno suboru je "  + req.file.filename);
       // console.log("id produktu je " + product._id);


        if (imageFile) {
            const resizedImageBuffer = await sharp(imageFile.path)
                .resize({ width: 250, height: 379 })
                .toBuffer();

            // Save the resized image
            const resizedImageFilename = `resized_${imageFile.filename}`;
            await sharp(resizedImageBuffer).toFile(`../frontend/public/books/${resizedImageFilename}`);
            product.imageURL = `books/${resizedImageFilename}`;
        }

        let productCategory = product.category;
        console.log("new product category " + product.newCategory);
        console.log("old product category " + productCategory);
        //console.log(existingCategory.name);
        console.log(product.newCategory !== 'undefined');
        if (product.newCategory !== 'undefined') {
            const category = new Category({name: product.newCategory});
            productCategory = product.newCategory;
            await category.save();
        }

        if (product._id) {
            await Item.findByIdAndUpdate(product._id, product);
            res.status(200).send("Produkt uspesne upraveny");
        } else {
            const item = new Item({
                name: product.name,
                author: product.author,
                price: product.price,
                category: productCategory,
                ISBN: product.ISBN,
                binding: product.binding,
                weight: product.weight,
                language: product.language,
                publisher: product.publisher,
                about: product.about,
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
        let productCategory = updatedProductInfo.category;
        console.log("new product category " + updatedProductInfo.newCategory);
        console.log("old product category " + productCategory);

        //console.log(existingCategory.name);
        console.log(updatedProductInfo.newCategory !== 'undefined');
        if (updatedProductInfo.newCategory !== 'undefined') {
            const category = new Category({name: updatedProductInfo.newCategory});
            productCategory = updatedProductInfo.newCategory;
           await category.save();
        }
        const existingCategory = await Category.findOne({ name: productCategory });
        if (req.file) {
            const imageFile = req.file;
            const resizedImageBuffer = await sharp(imageFile.path)
                .resize({ width: 250, height: 379 })
                .toBuffer();

            // Save the resized image
            const resizedImageFilename = `resized_${imageFile.filename}`;
            await sharp(resizedImageBuffer).toFile(`../frontend/public/books/${resizedImageFilename}`);
            updatedProductInfo.imageURL = `books/${resizedImageFilename}`;
        }
        // Update existing product information (excluding image file)
        await Item.findByIdAndUpdate(productID, {
            $set: {
                name: updatedProductInfo.name,
                author: updatedProductInfo.author,
                price: updatedProductInfo.price,
                category: existingCategory,
                ISBN: updatedProductInfo.ISBN,
                binding: updatedProductInfo.binding,
                weight: updatedProductInfo.weight,
                language: updatedProductInfo.language,
                publisher: updatedProductInfo.publisher,
                about: updatedProductInfo.about,
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
        const product = await Item.findById(productId).populate("category");
        //console.log("kategoria " + product);
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

router.get('/latestProducts', async function(req, res) {
    try {
        const latestProducts = await Item.find().sort({ createdAt: -1 }).limit(4);
        res.status(200).json(latestProducts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch latest products');
    }
});


module.exports = router;