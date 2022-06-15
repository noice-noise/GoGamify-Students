const LearningResource = require("../models/learningResource");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
let isOffline;

const learning_resource = (req, res) => {
  LearningResource.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      console.log("Number of Learning Resources: ", result.length);
      res.send(JSON.stringify(result));
    })
    .catch((err) => {
      res.render("404", { title: "Sorry, something went wrong." });
    });
};

const learning_resource_index = (req, res) => {
  console.log("Learning Resource index...");

  if (isOffline) {
    console.log("App is currently running offline...");
    console.log("Cannot retrieve learning resources from DB...");
    res.render("gamify/index", {
      title: "All Learning Resources",
      resources: [],
      offline: true,
    });
  } else {
    console.log("App is currently running online...");
    console.log("Retrieving learning resources from DB...");
    LearningResource.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        console.log("Number of Learning Resources: ", result.length);
        res.render("app/browse", {
          title: "All Learning Resources",
          resources: result,
          offline: false,
        });
      })
      .catch((err) => {
        res.render("404", { title: "Sorry, something went wrong." });
      });
  }
};

const learning_resource_view = async (req, res) => {
  console.log("Journey view...");
  const id = req.params.id;
  const userRole = req.session.user?.role.toLowerCase();
  await LearningResource.findById(id)
    .then((result) => {
      if (userRole == "student") {
        console.log("Viewing as student...");
        Student.findById(req.session.user.profile, (err, doc) => {
          if (err) {
            console.log("Error while accessing the document.");
            console.log(err);
          } else {
            res.render("app/journey-summary", {
              title: "Journey | GoGamify",
              resource: result,
              user: req.session.user,
              profile: doc,
            });
          }
        })
          .clone()
          .catch((err) => {
            console.log("Retrieval failed.");
            console.log(err);
          });
      } else if (userRole == "teacher") {
        console.log("Viewing as teacher...");
        Teacher.findById(req.session.user.profile, (err, doc) => {
          if (err) {
            console.log("Error while accessing the document.");
            console.log(err);
          } else {
            console.log("Rendered!");
            res.render("app/journey-summary", {
              title: "Journey | GoGamify",
              resource: result,
              user: req.session.user,
              profile: doc,
            });
            res.end();
          }
        })
          .clone()
          .catch((err) => {
            console.log("Retrieval failed.");
            console.log(err);
          });
      } else {
        console.log("Error, must log in as a student.");
        res.render("app/journey-summary", {
          title: "Journey | GoGamify",
          resource: result,
          user: req.session.user,
          profile: {
            _id: "xxxadminxxx",
            familyName: "Community",
            middleName: "X",
            firstName: "GoGamify",
          },
        });
        res.end();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const learning_resource_post = (req, res) => {
  console.log("Resource post...");
  const learningResource = new LearningResource(req.body);

  // active means that the learning resource can be shown to public
  learningResource.active = req.body.active == "on" ? true : false;

  const collectibles = req.body.collectibles;
  console.log("collectibles", collectibles);

  let htmlContent = learningResource.body;
  let modules = htmlContent.split(`<!-- module -->`); // split modules into an array
  modules = modules.filter((p) => p); // remove empty elements
  learningResource.modules = modules;

  try {
    learningResource.collectibles = [...req.body.collectibles.split(",")];
  } catch (err) {
    console.log("Error");
    learningResource.collectibles = [];
  }

  learningResource
    .save()
    .then((resource) => {
      console.log("Created resource: ", resource.title);
      if (req.session.user.role.toLowerCase() == "teacher") {
        Teacher.findByIdAndUpdate(
          req.session.user.profile,
          { $addToSet: { resources: resource._id } },
          { safe: true, upsert: true },
          (err, doc) => {
            if (err) {
              console.log("Error while accessing the document.");
              console.log(err);
            } else {
              console.log("resource id", resource._id);
              console.log("teacher resources: ", doc.resources);
              // res.redirect(`/resource/view/${resource._id}`);
              res.send(JSON.stringify(resource));
            }
          }
        )
          .clone()
          .catch((err) => {
            console.log("Retrieval failed.");
            console.log(err);
          });
      } else {
        console.log("Gamifying as a non-teacher account...");
        res.send(JSON.stringify(resource));
      }
    })
    .catch((err) => {
      console.log("ERROR saving resource", err);
      res.render("404", { title: "Sorry, something went wrong." });
    });
};

const learning_resource_get = async (req, res) => {
  const id = req.params.id;
  const userRole = req.session.user?.role.toLowerCase();
  await LearningResource.findById(id)
    .then((result) => {
      if (userRole == "student") {
        Student.findById(req.session.user.profile, (err, doc) => {
          if (err) {
            console.log("Error while accessing the document.");
            console.log(err);
          } else {
            res.render("gamify/details", {
              title: "Learning Resource Details",
              resource: result,
              user: doc,
            });
          }
        })
          .clone()
          .catch((err) => {
            console.log("Retrieval failed.");
            console.log(err);
          });
      } else if (userRole == "teacher") {
        Teacher.findById(req.session.user.profile, (err, doc) => {
          if (err) {
            console.log("Error while accessing the document.");
            console.log(err);
          } else {
            res.render("gamify/details", {
              title: "Learning Resource Details",
              resource: result,
              user: doc,
            });
          }
        })
          .clone()
          .catch((err) => {
            console.log("Retrieval failed.");
            console.log(err);
          });
      } else {
        return res.render("gamify/details", {
          title: "Learning Resource Details",
          resource: result,
          user: {
            familyName: "Community",
            middleName: "X",
            firstName: "GoGamify",
          },
        });
      }
    })
    .catch((err) => {
      console.log(err);
      // res.render("404", { title: "Sorry, something went wrong." });
    });
};

const learning_resource_put = (req, res) => {
  console.log("Updating gogamify resource...");
  LearningResource.findByIdAndUpdate(req.body._id, req.body, (err, docs) => {
    if (err) {
      console.log("PUT request error: ", err);
    } else {
      console.log("PUT success: ", docs);
      res.redirect("/gamify");
    }
  })
    .then((result) => {
      console.log("Yess!!");
      res.json({ redirect: "/gamify" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const learning_resource_delete = (req, res) => {
  const id = req.params.id;

  LearningResource.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/gamify" });
    })
    .catch((err) => {
      res.render("404", { title: "Sorry, something went wrong." });
    });
};

const learning_resource_data_get = (req, res) => {
  const id = req.params.id;
  LearningResource.findById(id)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      res.render("404", { title: "Sorry, something went wrong." });
    });
};

const learning_resource_join = async (req, res) => {
  await res.render("app/join-code", {
    title: "Join a Journey | GoGamify",
  });
};

module.exports = {
  learning_resource,
  learning_resource_index,
  learning_resource_view,
  learning_resource_post,
  learning_resource_get,
  learning_resource_put,
  learning_resource_delete,
  learning_resource_data_get,
  learning_resource_join,
};
