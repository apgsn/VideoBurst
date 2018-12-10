const express = require("express");
const router = express.Router();

const axios = require("axios");
const jwt = require("jsonwebtoken");
const secretOrKey = require("../../config/keys").secretOrKey;
const youtubeApiKey = require("../../config/keys").youtubeApiKey;
const passport = require("passport");
const bcrypt = require("bcryptjs");

const Video = require("../../models/Video");
const User = require("../../models/User");

//const validateVideo = require("../../validation/register");

// @route   POST api/video/add
// @desc    check if video/channel is already taken, then add it to the list
// @access  public
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const youtubeURI = "https://www.googleapis.com/youtube/v3/videos";

    const errors = {};
    /*const { errors, isInvalid } = validateRegister(req.body);

  if (isInvalid) {
    console.log(errors);
    return res.status(400).json(errors);
  }*/
    Video.findOne({ videoId: req.body.videoId })
      .then(video => {
        if (video) {
          errors.video = "Sorry, this video has already been posted";
          return res.status(400).json(errors);
        } else {
          axios
            .get(youtubeURI, {
              params: {
                key: youtubeApiKey,
                id: req.body.videoId,
                part: "snippet"
              }
            })
            .then(video => {
              video = video.data.items[0];
              const newVideo = new Video({
                user: req.user.id,
                videoId: req.body.videoId,
                channel: video.snippet.channelId,
                title: video.snippet.title,
                thumbnail: video.snippet.thumbnails.medium.url
              });
              newVideo.save().then(video => res.json(video));
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
