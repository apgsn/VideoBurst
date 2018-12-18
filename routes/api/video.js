const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const youtubeUrl = require("youtube-url");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const secretOrKey = require("../../config/keys").secretOrKey;
const youtubeApiKey = require("../../config/keys").youtubeApiKey;
const passport = require("passport");
const bcrypt = require("bcryptjs");

const Video = require("../../models/Video");
const User = require("../../models/User");

// @route   POST api/video/all
// @desc    fetch all videos from db
// @access  public
router.post("/all", (req, res) => {
  Video.find({})
    .populate("user", ["username"])
    .then(list => res.json(list))
    .catch(err => console.log(err));
});

// @route   POST api/video/add
// @desc    check if video is new, then add it to the list
// @access  private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const youtubeEndpoint = "https://www.googleapis.com/youtube/v3/videos";
    const errors = {};

    const videoId = youtubeUrl.extractId(req.body.videoUrl);
    if (!videoId) {
      errors.videoUrl = "Invalid Url";
      return res.status(400).json(errors);
    }

    Video.findOne({ videoId })
      .then(video => {
        if (video) {
          errors.video = "Sorry, this video has already been posted";
          return res.status(400).json(errors);
        } else {
          axios
            .get(youtubeEndpoint, {
              params: {
                key: youtubeApiKey,
                id: videoId,
                part: "snippet"
              }
            })
            .then(video => {
              video = video.data.items[0].snippet;
              videoId;
              const newVideo = new Video({
                user: req.user.id,
                videoId,
                channel: video.channelId,
                title: video.title,
                thumbnail: video.thumbnails.medium.url
              });
              newVideo.save().then(video => res.json(video));
            })
            .catch(err => {
              console.log(err);
              errors.missing = "Sorry, this video doesn't exist";
              return res.status(404).json(errors);
            });
        }
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
