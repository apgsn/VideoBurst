const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");

const user = require("./routes/api/user");
const video = require("./routes/api/video");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to mLab / MongoDB
const database = require("./config/keys").mongoURI;
mongoose
  .connect(
    database,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to mLab"))
  .catch(err => console.log(err));

// Passport middleware and config ("strategy")
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes list
app.use("/api/user", user);
app.use("/api/video", video);

const port = process.env.port || 5000;

// Deployment middleware
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log("Server running on port " + port));
