const express = require("express");
const router = express.Router();

const learningResourceController = require("../controllers/learningResourceController");
const { ensureAuthenticated } = require("../config/authConfig");

router.get(
  "/join",
  ensureAuthenticated,
  learningResourceController.learning_resource_join
);
router.get("/data/:id", learningResourceController.learning_resource_data_get);

router.get("/all", learningResourceController.learning_resource_index);
router.post("/save", learningResourceController.learning_resource_post);
router.put("/save", learningResourceController.learning_resource_put);
router.get("/:id", learningResourceController.learning_resource_get);
router.delete("/:id", learningResourceController.learning_resource_delete);

module.exports = router;
