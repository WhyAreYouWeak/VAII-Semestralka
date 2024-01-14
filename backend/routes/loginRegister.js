const express = require('express');
const User = require("../models/User");
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');
const { hash } = bcrypt;

router.post('/register', async function (req,res) {
  try {
      const {email, password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
          res.status(201).send('Hesla sa nezhoduju');
      } else {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword  = await bcrypt.hash(password, salt);
          const user = new User({email , password: hashedPassword});
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

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}));



module.exports = router;