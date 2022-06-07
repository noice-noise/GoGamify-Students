const Teacher = require("../models/teacher");
const User = require("../models/user");
const LearningResource = require("../models/learningResource");

const teacher_index = (req, res) => {
  res.render("teacher/index", {
    title: "Dashboard | GoGamify",
    user: req.session.user,
  });
};

const teacher_post = async (req, res) => {
  console.log("Saving teacher model...");

  const teacher = new Teacher(req.body);
  await teacher
    .save()
    .then((data) => {
      User.findByIdAndUpdate(
        req.session.user._id,
        { profile: data._id },
        (err, docs) => {
          if (err) {
            console.log("Error updating user: ", err);
          } else {
            console.log("User Updated: ", docs.familyName);
            res.clearCookie("user");
            res.redirect("/home");
          }
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Sorry, something went wrong.",
      });
    });
};

module.exports = {
  teacher_index,
  teacher_post,
};
