const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const studentController = require("../controllers/studentController");

router.get("/", adminController.admin_index);
router.get("/student-accounts", studentController.student_index);

module.exports = router;
