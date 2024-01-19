const express = require("express");
const router = express.Router();
router.get('/getCategories', (req, res, next) => {
    const categories = [
        { _id: '1', name: 'Česká próza' },
        { _id: '2', name: 'Romantika' },
        { _id: '3', name: 'Horory' },
    ];
    res.status(200).json(categories);
});
module.exports = router;