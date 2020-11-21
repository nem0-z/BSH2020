const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();

router.route("/login").post(controller.login);
router.route("/mytasks").post(controller.mytasks);
router.route("/teamtasks").post(controller.teamtasks);
router.route("/appendmytask").post(controller.appendmytask);
router.route("/solution").post(controller.solution);
router.route("/showsolution").post(controller.showsolution);
router.route("/calendar").post(controller.calendar);

module.exports = router;
