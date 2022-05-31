const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");

router.post("/p/resources", studentController.student_resources_post);
router.get("/p/resources", studentController.student_resources_get);
router.delete("/p/resources/:id", studentController.student_resources_delete);

router.get("/p/currentPage", studentController.student_current_page);
router.post("/p/currentPage/next", studentController.student_page_next);
router.post("/p/currentPage/prev", studentController.student_page_prev);

router.post("/p/collections", studentController.student_collections_post);
router.get("/p/collections", studentController.student_collections_get);
router.delete(
  "/p/collections/:id",
  studentController.student_collections_delete
);

router.get("/profile/", studentController.profile_get);

router.post("/profile/preferences", studentController.profile_preference_post);
router.get("/profile/preferences", studentController.profile_preference_get);

router.get("/p/resources", studentController.community_school_get);

router.post("/register", studentController.student_post);
router.get("/:id", studentController.student_get);
router.put("/update/:id", studentController.student_put);
router.delete("/:id", studentController.student_delete);

module.exports = router;
