const express = require('express');
const User = require("../models/User");
const router = express.Router();


router.post('/register', async function (req,res) {
  try {
      const {email, password, confirmPassword } = req.body;
      const user = new User({email, password});
      await user.save();
      res.status(201).send("ide to kekw");
  } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
  }
});

module.exports = router;