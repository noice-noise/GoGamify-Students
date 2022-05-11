const Student = require("../models/student");
const User = require("../models/user");

// check internet connection
let isOffline;
require("dns").resolve("www.google.com", function (err) {
  if (err) {
    console.log("No connection");
    isOffline = true;
  } else {
    console.log("Connected");
    isOffline = false;
  }
});

const student_index = (req, res) => {
  console.log("student index");
  if (isOffline) {
    console.log("App is currently running offline...");
    console.log("Cannot retrieve learning resources from DB...");
    res.render("admin/student-accounts", {
      title: "Admin: Student Accounts",
      accounts: [],
      offline: true,
    });
  } else {
    console.log("App is currently running online...");
    console.log("Retrieving learning resources from DB...");
    Student.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        console.log("Number of items: ", result.length);
        console.log("l: ", result.length);
        res.render("admin/student-accounts", {
          title: "Admin: Student Accounts",
          accounts: result,
          offline: false,
        });
      })
      .catch((err) => {
        res.render("404", { title: "Sorry, something went wrong." });
      });
  }
};

const student_post = async (req, res) => {
  console.log("USER request: ", req.user);
  console.log("USER session: ", req.session.user);
  console.log("USER cookies: ", req.cookies.user);
  console.log("Saving student model...");

  const student = new Student(req.body);
  await student
    .save()
    .then((data) => {
      User.findByIdAndUpdate(
        req.session.user._id,
        { profile: data._id },
        (err, docs) => {
          if (err) {
            console.log("Error updating user: ", err);
          } else {
            console.log("User Updated: ", docs);
          }
        }
      );

      res.redirect("/pwa/learning-module/module.html");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Sorry, something went wrong.",
      });
    });
};

const student_get = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await Student.findById(id)
    .then((result) => {
      res.render("student/details", {
        title: "Learning Resource Details",
        resource: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("404", { title: "Sorry, something went wrong." });
    });
};

const student_put = (req, res) => {
  // router.put("/students/:id", function (req, res, next) {
  //   Student.findOneAndUpdate({ _id: req.params.id }, req.body).then(function (
  //     student
  //   ) {
  //     Student.findOne({ _id: req.params.id }).then(function (student) {
  //       res.send(student);
  //     });
  //   });
  // });
  // console.log("put!!");
  // student.findByIdAndUpdate(req.params.id, {
  //   title: req.body.title,
  //   subtitle: req.body.subtitle,
  //   owner: req.body.owner,
  //   active: req.body.active,
  //   body: req.body.body,
  // })
  //   .then((result) => {
  //     res.send("Resource Updated!");
  //   })
  //   .catch((err) => {
  //     console.error(err.message);
  //     res.send(400).send("Server Error");
  //   });
};

const student_delete = async (req, res) => {
  const id = req.params.id;

  await Student.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/admin/student-accounts" });
    })
    .catch((err) => {
      res.render("404", { title: "Sorry, something went wrong." });
    });
};

const profile_preference_post = async (req, res) => {
  await User.findByIdAndUpdate(
    req.session.user._id,
    {
      preferences: {
        theme: req.body.theme,
      },
    },
    (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
        res.send({ message: "Preference changes saved" });
      }
    }
  )
    .clone()
    .catch((err) => {
      console.log(err);
    });
};

const profile_preference_get = async (req, res) => {
  await User.findById(req.session.user._id, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successful");
      console.log("doc", doc);
      console.log("docType", typeof doc);
      console.log(doc.preferences);
      res.send(JSON.stringify(doc.preferences));
    }
  })
    .clone()
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  student_index,
  student_post,
  student_get,
  student_put,
  student_delete,
  profile_preference_post,
  profile_preference_get,
};
