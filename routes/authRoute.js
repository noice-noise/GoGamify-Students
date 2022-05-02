const express = require("express");
const passport = require("passport");
const router = express.Router();

const authController = require("../controllers/authController");
const { forwardAuthenticated } = require("../config/authConfig");

router.get("/login", forwardAuthenticated, authController.login);
router.delete("/logout", authController.logout);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/pwa/home.html",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);

router.post("/register", authController.register_post);
router.get("/register", authController.register);
router.get("/register/student", authController.register_student);

module.exports = router;
