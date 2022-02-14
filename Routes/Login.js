const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const app = express.Router();
var multer = require("multer");

app.get("/login_auth", (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(500).send("Error cannot proceed");
  }
});

module.exports = app;
