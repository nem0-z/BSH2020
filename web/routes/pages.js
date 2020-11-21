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

router.get("/appendmytask", function (req, res) {
  res.render("appendmytask");
});

router.get("/solution", function (req, res) {
  res.render("solution");
});

router.get("/showsolution", function (req, res) {
  res.render("showsolution");
});

router.get("/makenewtask", function (req, res) {
  res.render("makenewtask");
});

router.get("/calendar", function (req, res) {
  res.render("calendar");
});

router.get("/home", function (req, res) {
  res.render("homepage");
});

router.get("/map", function (req, res) {
  res.render("map");
});

module.exports = router;
