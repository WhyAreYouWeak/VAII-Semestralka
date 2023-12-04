import {Function} from "../controllers/HomePage";

const express = require("express");
import * as HomePage from "../controllers/HomePage";

const router = express.Router();

router.get('/', function(req, res, next) {
    res.json({error: "kokot si"});
});

module.exports = router;


