const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require('passport');
const User = require("../models/User");

// Login page
router.get("/login", (req, res) => {
  res.render("login");
});

// register page
router.get("/register", (req, res) => {
  res.render("register");
});

// register page
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  User.findOne({ email: email }).then(user => {
    if (user === null) {
      const newUser = new User({
        name,
        email,
        password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              req.flash('messages', "gelukt");
              res.redirect("/users/login");
            })
            .catch(err => console.log(err));
        });
      });
      console.log(newUser);
    } else {
      console.log("user exists");
    }
  });

  console.log(name, email, password, password2);
});

//Login handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
})

//Log out handle
router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/users/login');
})

module.exports = router;
