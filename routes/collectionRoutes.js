const express = require("express");
const router = express.Router();

const collectionController = require("../controllers/collectionController");
const { ensureAuthenticated } = require("../config/authConfig");

/**
 * {site-url}/student/{route}
 * example:
 * https://gogamify-education.herokuapp.com/student/create
 * https://gogamify-education.herokuapp.com/student/data/all
 * https://gogamify-education.herokuapp.com/student/data/e8szc3476na83h1asd3
 */

router.get("/", collectionController.collectible_index);
router.get("/browse", collectionController.collectible_browse);
router.get("/create", collectionController.collectible_create);
router.get("/earn", ensureAuthenticated, collectionController.collectible_earn);

router.get("/data/all", collectionController.collectible);
router.get("/data/:id", collectionController.collectible_data_get);

router.get("/all", collectionController.collectible_index);
router.post("/save", collectionController.collectible_post);
router.put("/save", collectionController.collectible_put);
router.get("/:id", collectionController.collectible_get);
router.delete("/:id", collectionController.collectible_delete);

module.exports = router;
