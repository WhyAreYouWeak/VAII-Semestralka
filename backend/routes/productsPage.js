const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
router.get('/getCategories', async function (req, res, next)  {
    const categories = await Category.find();
    res.status(200).json(categories);
});
module.exports = router;