const express = require('express');
const User = require("../models/User");
const Review = require("../models/Review");
const Order = require("../models/Order");
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

router.post('/login', (req, res, next) => {
    passport.authenticate("local", async (err, user, info ) => {
        if (err)
            return next(err);
        else if (!user)
            return res.status(400).send([ info.message ]);

        req.logIn(user, (err) => {
            if (err)
                return next(err);

            return res.status(200).json({
                id: user.id,
                email: user.email,
            });
        });
    })(req, res, next);
});

router.post('/logout', (req, res, next) => {
    console.log(" LOGOUT " + req.user);
   req.logout((error) => {
       if (error) {
           return res.status(400).send(error)
       } else {
           return res.status(200).send("Logout success.");
       }

   });
});

router.post('/delete', async (req, res, next) => {
    console.log(" Delete " + req.user);
    const user = req.user;
    await Review.deleteMany({user: user});
    await Order.deleteMany({user: user});
    await User.findByIdAndDelete(req.user);
    req.logout((error) => {
        if (error) {
            return res.status(400).send(error)
        } else {
            return res.status(200).send("Logout success.");
        }
    });

});

router.get('/success', (req, res) => {


    res.status(200).send('Login successful: ' + req.body.user );
});

router.get('/failure', (req, res) => {
    res.status(200).send('Login failed');
});

module.exports = router;