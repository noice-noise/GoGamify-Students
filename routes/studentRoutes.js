const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");

// router.post("/", studentController.student_index);
router.post("/register", studentController.student_post);
router.get("/:id", studentController.student_get);
router.put("/update/:id", studentController.student_put);
router.delete("/:id", studentController.student_delete);

module.exports = router;