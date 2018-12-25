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
    .sort({ date: -1 })
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
      errors.video = "Invalid Url";
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
              errors.video = "Sorry, this video doesn't exist";
              return res.status(404).json(errors);
            });
        }
      })
      .catch(err => console.log(err));
  }
);

// @route   POST api/video/like/:id
// @desc    like/dislike video
// @access  private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Video.findOne({ videoId: req.params.id })
      .then(video => {
        User.findById(req.user.id)
          .then(user => {
            if (String(video.user) !== req.user.id) {
              Promise.all([toggleLike(video, user), toggleLike(user, video)])
                .then(() => {
                  return res.json(video);
                })
                .catch(err => {
                  console.log(err);
                  errors.video =
                    "Something went wrong liking or disliking the video";
                  return res.status(400).json(errors);
                });
            } else {
              errors.video = "Users cannot like/dislike their own videos";
              return res.status(400).json(errors);
            }
          })
          .catch(err => {
            console.log(err);
            errors.video = "User not found";
            return res.status(404).json(errors);
          });
      })
      .catch(err => {
        console.log(err);
        errors.video = "Database fetch error";
        return res.status(404).json(errors);
      });
  }
);

async function toggleLike(obj1, obj2) {
  // check if obj2 is already included in likes list of obj1
  if (obj1.likes.filter(like => String(like._id) === String(obj2._id)).length) {
    // if that's true, it means it's an "unlike" action:
    // remove obj2 from likes list of obj1
    const idx = obj1.likes
      .map(like => String(like._id))
      .indexOf(String(obj2._id));
    obj1.likes.splice(idx, 1);
  } else {
    // otherwise it's a "like" action: add obj2 to likes list of obj1
    obj1.likes.push(obj2);
  }
  return await obj1.save();
}

module.exports = router;
