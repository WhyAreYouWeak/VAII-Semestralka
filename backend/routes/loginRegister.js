const express = require('express');
const User = require("../models/User");
const router = express.Router();


router.post('/register', async function (req,res) {
  try {
      const {email, password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
          res.status(201).send('Hesla sa nezhoduju');
      } else {
          const user = new User({email, password});
          await user.save();
          res.status(201).send("Pouzivatel zaregistrovany");
      }

  } catch (err) {
      if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
          res.status(201).send('Email uz existuje');
      } else {
          console.error(err);
          res.status(500).send('Internal Server Error');
      }
  }
});



module.exports = router;