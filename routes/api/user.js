const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const secretOrKey = require("../../config/keys").secretOrKey;
const passport = require("passport");
const bcrypt = require("bcryptjs");

const validateRegister = require("../../validation/register");
const validateLogin = require("../../validation/login");

// @route   POST api/users/register
// @desc    register users
// @access  public
router.post("/register", (req, res) => {
  const { errors, isInvalid } = validateRegister(req.body);

  if (isInvalid) {
    console.log(errors);
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    login, returning jwt token if successful
// @access  public
router.post("/login", (req, res) => {
  const { errors, isInvalid } = validateLogin(req.body);
  if (isInvalid) {
    console.log(errors);
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user._id,
            username: user.username
          };
          jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
            res.json({ token: "Bearer " + token });
          });
        } else {
          errors.password = "Password incorrect";
          res.status(400).json(errors);
        }
      });
    }
  });
});

// @route   GET api/users/current
// @desc    return current user
// @access  private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
