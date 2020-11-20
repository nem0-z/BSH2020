const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();

router.route("/login").post(controller.login);
router.route("/mytasks").post(controller.mytasks);
router.route("/teamtasks").post(controller.teamtasks);

module.exports = router;
