const express = require("express");
const passport = require("passport");
const router = express.Router();

const authController = require("../controllers/authController");
const { forwardAuthenticated, setAuthCookie } = require("../config/authConfig");

router.get("/login", forwardAuthenticated, authController.login);
router.delete("/logout", authController.logout);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
  setAuthCookie
);

router.post("/register", authController.register_post);
router.get("/register", authController.register);
router.get(
  "/register/account/student",
  authController.register_account_student
);
router.get(
  "/register/account/teacher",
  authController.register_account_teacher
);
router.get("/register/student", authController.register_student);
router.post("/register/student", authController.register_student_post);
router.get("/register/teacher", authController.register_teacher);

module.exports = router;
