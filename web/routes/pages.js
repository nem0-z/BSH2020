const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("login");
});

router.get("/mytasks", function (req, res) {
  res.render("mytasks");
});

router.get("/teamtasks", function (req, res) {
  res.render("teamtasks");
});

module.exports = router;
