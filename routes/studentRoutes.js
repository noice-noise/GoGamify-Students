const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");

router.post("/register", studentController.student_post);
router.get("/:id", studentController.student_get);
router.put("/update/:id", studentController.student_put);
router.delete("/:id", studentController.student_delete);

router.post("/p/resources", studentController.student_resources_post);
router.get("/p/resources", studentController.student_resources_get);
router.delete("/p/resources/:id", studentController.student_resources_delete);

router.get("/p/currentPage", studentController.student_current_page);
router.post("/p/currentPage/next", studentController.student_page_next);
router.post("/p/currentPage/prev", studentController.student_page_prev);

router.post("/profile/preferences", studentController.profile_preference_post);
router.get("/profile/preferences", studentController.profile_preference_get);

module.exports = router;
