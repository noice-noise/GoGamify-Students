const express = require("express");
const router = express.Router();

const learningResourceController = require("../controllers/learningResourceController");

router.post("/save", learningResourceController.learning_resource_post);
router.get("/:id", learningResourceController.learning_resource_get);
router.put("/save", learningResourceController.learning_resource_put);
router.delete("/:id", learningResourceController.learning_resource_delete);

router.get("/data/:id", learningResourceController.learning_resource_data_get);

module.exports = router;
