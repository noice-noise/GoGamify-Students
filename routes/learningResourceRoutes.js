const express = require("express");
const router = express.Router();

const learningResourceController = require("../controllers/learningResourceController");
const { ensureAuthenticated } = require("../config/authConfig");

/**
 * {site-url}/student/{route}
 * example:
 * https://gogamify-education.herokuapp.com/resource/data/join
 * https://gogamify-education.herokuapp.com/resource/data/all
 * https://gogamify-education.herokuapp.com/resource/data/e8zxcszc3476na83h1asd3
 */

router.get(
  "/join",
  ensureAuthenticated,
  learningResourceController.learning_resource_join
);

router.get(
  "/view/:id",
  ensureAuthenticated,
  learningResourceController.learning_resource_view
);

router.get("/data/all", learningResourceController.learning_resource);
router.get("/data/:id", learningResourceController.learning_resource_data_get);

router.get("/all", learningResourceController.learning_resource_index);
router.post("/save", learningResourceController.learning_resource_post);
router.put("/save", learningResourceController.learning_resource_put);
router.get("/:id", learningResourceController.learning_resource_get);
router.delete("/:id", learningResourceController.learning_resource_delete);

module.exports = router;
