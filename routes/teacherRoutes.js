const express = require("express");
const router = express.Router();

const teacherController = require("../controllers/teacherController");

router.get("/", teacherController.teacher_index);
router.post("/register", teacherController.teacher_post);

module.exports = router;
