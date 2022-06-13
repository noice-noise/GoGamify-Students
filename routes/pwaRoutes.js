const express = require("express");
const router = express.Router();

const LearningResource = require("../models/learningResource.js");

router.get("/journey/completed", (req, res) => {
  res.render("app/journey-done", {
    title: "Journey Completed | GoGamify",
  });
});

router.get("/journey/browse", (req, res) => {
  console.log("Retrieving learning resources from DB...");
  LearningResource.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      console.log("Number of Learning Resources: ", result.length);
      res.render("app/browse-journey", {
        title: "Explore Journey | GoGamify",
        resources: result,
        offline: false,
      });
    })
    .catch((err) => {
      res.render("404", { title: "Sorry, something went wrong." });
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
