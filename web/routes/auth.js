const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();

router.route("/login").post(controller.login);
router.route("/mytasks").post(controller.mytasks);
router.route("/teamtasks").post(controller.teamtasks);
router.route("/appendmytask").post(controller.appendmytask);
router.route("/solution").post(controller.solution);
router.route("/showsolution").post(controller.showsolution);
router.route("/makenewtask").post(controller.makenewtask);
router.route("/getOnetimeReminders").get(controller.getOnetimeReminders);
router.route("/getRepeatingReminders").get(controller.getRepeatingReminders);
router.route("/addReminder").post(controller.addReminder);
router.route("/calendar").post(controller.calendar);
router.route("/changeReminderActivity").put(controller.changeReminderActivity);
router.route("/addtasktocalendar").post(controller.addtasktocalendar);
router.route('/editReminder').put(controller.editReminder);
router.route("/calendarReminder").post(controller.calendarReminder);

module.exports = router;
