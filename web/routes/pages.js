const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("login");
});

router.get("/mytasks", function (req, res) {
  res.render("mytasks");
});

module.exports = router;
