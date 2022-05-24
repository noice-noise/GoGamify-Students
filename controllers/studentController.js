const Student = require("../models/student");
const User = require("../models/user");
const LearningResource = require("../models/learningResource");

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

/**
 * Allow access of student_index to admin only.
 */
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
  // console.log("USER request: ", req.user);
  // console.log("USER session: ", req.session.user);
  // console.log("USER cookies: ", req.cookies.user);
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
        fontFamily: req.body.fontFamily,
        fontSize: req.body.fontSize,
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

const student_resources_post = async (req, res) => {
  console.log("Target resource rode:", req.body.code);

  try {
    await LearningResource.findOne({ _id: req.body.code }).then(
      async (resource) => {
        await Student.findByIdAndUpdate(
          req.session.user.profile,
          { $addToSet: { resources: resource } },
          { safe: true, upsert: true },
          (err, docs) => {
            if (err) {
              console.log("Error, journey probably doesn't exist.");
              console.log(err);
            } else {
              console.log(docs);
              res.redirect("/home");
            }
          }
        )
          .clone()
          .catch((err) => {
            console.log(err);
          });
      }
    );
  } catch (err) {
    console.log("Journey does not exist.");
    console.error(err);
    await res.render("app/join-code", {
      title: "Join a Journey | GoGamify",
      messages: { error: "Journey does not exist." },
    });
  }
};

const student_resources_get = async (req, res) => {
  console.log("Retrieving resources from DB...");
  await Student.findById(req.session.user.profile, (err, doc) => {
    if (err) {
      console.log("Error while accessing the document.");
      console.log(err);
    } else {
      console.log("Document", doc);
      console.log("resources", doc.resources);
      res.send(JSON.stringify(doc.resources));
    }
  })
    .clone()
    .catch((err) => {
      console.log("Retrieval failed.");
      console.log(err);
    });
};

const student_resources_delete = async (req, res) => {
  console.log("Retrieving resource to delete from DB...");
  await Student.findByIdAndDelete(req.session.user.profile, (err, doc) => {
    if (err) {
      console.log("Error while accessing the document.");
      console.log(err);
    } else {
      console.log("Document", doc);
    }
  })
    .clone()
    .catch((err) => {
      console.log("Retrieval failed.");
      console.log(err);
    });
};

const student_current_page = async (req, res) => {
  console.log("Retrieving resources from DB...");
  await Student.findById(req.session.user.profile, (err, doc) => {
    if (err) {
      console.log("Error while accessing the document.");
      console.log(err);
    } else {
      if (!doc.currentPage) {
        console.log(
          "Current page is empty, sending the first user resource instead..."
        );

        /**
         * If user resources are empty, send a template prompt to browse/join journey
         */
        if (!doc.resources || doc.resources.length === 0) {
          const promptBrowse = `<section class="section flex flex-col justify-center items-center">
        <a class="button button--cta px-10 py-8" href="/resource/all">Browse Journeys</a>
        <a class="button button--muted px-10 py-8" href="/resource/join">Join using code</a>
        </section>`;
          console.log("No user resources available...");
          console.log("Sending browse journey prompt instead...");
          res.send(JSON.stringify(promptBrowse));
        } else {
          const firstModule = doc.resources[0].modules[0];

          /**
           * Initialize first module as the current page and page number,
           * then send as a response
           */
          Student.findByIdAndUpdate(
            req.session.user.profile,
            {
              currentPage: firstModule,
              currentPageNumber: 0,
              currentPageIndex: 0,
            },
            (err, docs) => {
              if (err) {
                console.log("Error occurred");
                console.log(err);
              } else {
                // console.log(docs);
                res.send(JSON.stringify(firstModule));
              }
            }
          )
            .clone()
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        console.log("Current page number:", doc.currentPageNumber);
        console.log("Current page set, sending...");
        const targetResourceIndex = doc.currentPageIndex;
        const targetModulesIndex = doc.currentPageNumber;
        res.send(
          JSON.stringify(
            doc.resources[targetResourceIndex].modules[targetModulesIndex]
          )
        );
      }
    }
  })
    .clone()
    .catch((err) => {
      console.log("Retrieval failed.");
      console.log(err);
    });
};

const student_page_next = async (req, res) => {
  await Student.findByIdAndUpdate(
    req.session.user.profile,
    {
      $inc: { currentPageNumber: 1 },
    },
    (err, docs) => {
      if (err) {
        console.log("Error occurred");
        console.log(err);
      } else {
        console.log("Page number increment success.");
        console.log("Current page number:", docs.currentPageNumber);
        res.redirect("/home");
      }
    }
  ).catch((err) => {
    console.log(err);
  });
};

const student_page_prev = async (req, res) => {
  await Student.findByIdAndUpdate(
    req.session.user.profile,
    {
      $inc: { currentPageNumber: -1 },
    },
    (err, docs) => {
      if (err) {
        console.log("Error occurred");
        console.log(err);
      } else {
        console.log("Page number decrement success.");
        console.log("Current page number:", docs.currentPageNumber);
        res.redirect("/home");
      }
    }
  ).catch((err) => {
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
  student_resources_get,
  student_resources_post,
  student_resources_delete,
  student_current_page,
  student_page_next,
  student_page_prev,
};
