const express = require("express");
const router = express.Router();
router.get('/getCategories', (req, res, next) => {
    res.status(200).send('getCategories' );
});
module.exports = router;