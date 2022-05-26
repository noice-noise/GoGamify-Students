const express = require("express");
const router = express.Router();

router.get("/journey/completed", (req, res) => {
  res.render("app/journey-done", {
    title: "Journey Completed | GoGamify",
  });
});

router.get("/journey", (req, res) => {
  res.redirect("/pwa/journey/journey.html");
});

router.get("/collections", (req, res) => {
  res.redirect("/pwa/collections/collections.html");
});

router.get("/community", (req, res) => {
  res.redirect("/pwa/community/community.html");
});

router.get("/module", (req, res) => {
  res.redirect("/pwa/learning-module/module.html");
});

router.get("/profile", (req, res) => {
  res.redirect("/pwa/profile/profile.html;");
});

module.exports = router;
