const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

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

const port = process.env.port || 5000;
app.listen(port, () => console.log("Server running on port " + port));
