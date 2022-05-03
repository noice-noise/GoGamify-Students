const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/login", authController.login);
// router.get("/login/verify", authController.login_verify);
router.get("/register", authController.register);
router.get("/register/student", authController.register_student);
// router.get("/register/teacher", authController.register_student);

module.exports = router;
