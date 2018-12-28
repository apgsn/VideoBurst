const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const Video = require("../../models/Video");

const jwt = require("jsonwebtoken");
const secretOrKey = require("../../config/keys").secretOrKey;
const passport = require("passport");
const bcrypt = require("bcryptjs");

const validateRegister = require("../../validation/register");
const validateLogin = require("../../validation/login");

// @route   POST api/user/register
// @desc    register users
// @access  public
router.post("/register", (req, res) => {
  const { errors, isInvalid } = validateRegister(req.body);

  if (isInvalid) {
    console.log(errors);
    return res.status(400).json(errors);
  }

  User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  }).then(user => {
    if (user) {
      errors.taken = "Email and/or user are already taken";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        likesCount: 0
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

// @route   POST api/user/login
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
            id: user.id,
            username: user.username
          };
          jwt.sign(payload, secretOrKey, { expiresIn: "1d" }, (err, token) => {
            res.json({
              token: "Bearer " + token
            });
          });
        } else {
          errors.password = "Password incorrect";
          res.status(400).json(errors);
        }
      });
    }
  });
});

// @route   GET api/user/leaderboard
// @desc    return list of users with most liked content
// @access  public
router.get("/leaderboard", (req, res) => {
  User.find({})
    .sort([["likesCount", -1]])
    .limit(10)
    .then(list => {
      return res.json(
        list.map(user => ({
          username: user.username,
          likesCount: user.likesCount
        }))
      );
    })
    .catch(err => console.log(err));
});

// @route   GET api/user/u/:username
// @desc    return public profile of a user
// @access  public
router.get("/u/:username", (req, res) => {
  const errors = {};

  User.findOne({ username: req.params.username })
    .populate("uploads")
    .then(user => {
      console.log(user);
      if (!user) {
        errors.noUser = "This user doesn't exist";
        return res.status(404).json(errors);
      }
      return res.json({
        username: user.username,
        likesGiven: user.likes.length,
        likesCount: user.likesCount,
        uploads: user.uploads,
        date: user.date
      });
    })
    .catch(err => console.log(err));
});

// @route   GET api/user/profile
// @desc    access personal profile
// @access  private
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then(user => res.json(user))
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
