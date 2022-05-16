const express = require("express");
const router = express.Router();

const gamifyController = require("../controllers/gamifyController");

router.get("/", gamifyController.gamify_index);
router.get("/create", gamifyController.gamify_create_get);
router.get("/file", gamifyController.gamify_file_get);
router.post("/file", gamifyController.gamify_file_post);
router.delete("/file", gamifyController.gamify_file_delete);
router.get("/file-upload-list", gamifyController.gamify_file_list_get);

module.exports = router;
