const Student = require("../models/student");
const Teacher = require("../models/teacher");
const User = require("../models/user");
const LearningResource = require("../models/learningResource");
const Collectible = require("../models/collectible");
const path = require("path");
const fs = require("fs");

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
            res.clearCookie("user");
            res.redirect("/home");
          }
        }
      );
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
  /**
   * TODO implement updating of profile
   */
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

const student_resources_post = async (req, res) => {
  console.log("Target resource code:", req.body.code);

  try {
    /**
     * store student ID in the learning resource
     */
    await LearningResource.findById(
      req.body.code,
      // { $addToSet: { students: req.session.user.profile } },
      // { safe: true, upsert: true },
      (err, resource) => {
        console.log("Resources!: ", resource.title);
        if (err) {
          console.log(err);
        } else {
          console.log("Adding to student resources...");

          /**
           * Store learning resource ID to student.resources property
           */
          Student.findByIdAndUpdate(
            req.session.user.profile,
            {
              $addToSet: {
                resources: resource,
              },
            },
            { safe: true, upsert: true },
            (err, docs) => {
              if (err) {
                console.log("Error, getting document data.");
                console.log(err);
              } else {
                console.log(docs);

                /**
                 * Get student document in preparation for update
                 */
                Student.findById(req.session.user.profile, (err, doc) => {
                  if (err) {
                    console.log("Error while accessing the document.");
                    console.log(err);
                  } else {
                    const indexOfExisting = findResource(
                      resource,
                      doc.resources
                    );

                    const targetIndex =
                      indexOfExisting === -1
                        ? doc.resources.length - 1
                        : indexOfExisting;

                    const targetModule = doc.resources[targetIndex].modules[0];

                    console.log("resources", doc.resources);
                    console.log(
                      "resourcesCurrentPages",
                      doc.resourcesCurrentPages
                    );

                    /**
                     * Update student.current* props to select the newly added resource
                     */
                    Student.findByIdAndUpdate(
                      req.session.user.profile,
                      {
                        currentPage: targetModule,
                        currentPageNumber: 0,
                        currentPageIndex: targetIndex,
                      },
                      (err, docs) => {
                        if (err) {
                          console.log("Error occurred");
                          console.log(err);
                        } else {
                          console.log(
                            "Updating resourcesCurrentPages with target:",
                            resource._id,
                            resource.title
                          );
                          Student.updateOne(
                            {
                              _id: req.session.user.profile,
                              "resourcesCurrentPages.id": resource._id,
                            },

                            {
                              $set: {
                                "resourcesCurrentPages.$.id": resource._id,
                                "resourcesCurrentPages.$.currentPageNumber":
                                  !doc.currentPageNumber
                                    ? 0
                                    : doc.currentPageNumber,
                              },
                            },
                            {
                              safe: true,
                              upsert: true,
                            },
                            (err, docs) => {
                              if (err) {
                                console.log("Error occurred");
                                console.log(err);
                              } else {
                                console.log("Success!");
                                res.redirect("/home");
                              }
                            }
                          )
                            .clone()
                            .catch((err) => {
                              console.log(err);
                              console.log(
                                "Error, resource non-existing, creating the object instead...."
                              );
                              Student.findByIdAndUpdate(
                                req.session.user.profile,
                                {
                                  $addToSet: {
                                    resourcesCurrentPages: {
                                      id: resource._id,
                                      currentPageNumber: 0,
                                    },
                                  },
                                },
                                {
                                  safe: true,
                                  upsert: true,
                                },
                                (err, docs) => {
                                  if (err) {
                                    console.log("Error occurred");
                                    console.log(err);
                                  } else {
                                    // res.send(JSON.stringify(targetModule));
                                    res.redirect("/home");
                                  }
                                }
                              )
                                .clone()
                                .catch((err) => {
                                  console.log(err);
                                });
                            });

                          // res.redirect("/home");
                        }
                      }
                    )
                      .clone()
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                })
                  .clone()
                  .catch((err) => {
                    console.log("Retrieval failed.");
                    console.log(err);
                  });
              }
            }
          )
            .clone()
            .catch((err) => {
              console.log(err);
            });
        }
      }
    )
      .clone()
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log("Journey does not exist.");
    console.error(err);
    await res.render("app/join-code", {
      title: "Join a Journey | GoGamify",
      messages: { error: "Journey does not exist." },
    });
  }
};

function findResource(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    // toString allows proper comparing of resource IDs
    if (list[i]._id.toString() == obj._id.toString()) {
      return i;
    }
  }

  return -1;
}

const student_resources_get = async (req, res) => {
  console.log("Retrieving resources from DB...");
  await Student.findById(req.session.user.profile, (err, doc) => {
    if (err) {
      console.log("Error while accessing the document.");
      console.log(err);
    } else {
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
  // TODO implement resource delete, this is only an option, primary way is to just complete the resource then it will be moved in Completed array, instead of entirely deleting which is much more intended.
};

const student_resources_pages_get = async (req, res) => {
  console.log("Retrieving resources from DB...");
  await Student.findById(req.session.user.profile, (err, doc) => {
    if (err) {
      console.log("Error while accessing the document.");
      console.log(err);
    } else {
      console.log("resourcesCurrentPages", doc.resourcesCurrentPages);
      res.send(JSON.stringify(doc.resourcesCurrentPages));
    }
  })
    .clone()
    .catch((err) => {
      console.log("Retrieval failed.");
      console.log(err);
    });
};

const student_completed = async (req, res) => {
  console.log("Retrieving resources from DB...");
  await Student.findById(req.session.user.profile, (err, doc) => {
    if (err) {
      console.log("Error while accessing the document.");
      console.log(err);
    } else {
      console.log("Number of completed resources:", doc.completed);
      res.send(JSON.stringify(doc.completed));
    }
  })
    .clone()
    .catch((err) => {
      console.log("Retrieval failed.");
      console.log(err);
    });
};

const student_collections_post = async (req, res) => {
  console.log("Target collectible id:", req.body.id);

  try {
    await Collectible.findOne({ _id: req.body.id }).then(
      async (collectible) => {
        if (!collectible) {
          throw new Error("Invalid collectible.");
        }

        await Student.findByIdAndUpdate(
          req.session.user.profile,
          { $addToSet: { collections: collectible } },
          { safe: true, upsert: true },
          (err, docs) => {
            if (err) {
              console.log("Error, collectible doesn't exist.");
              console.log(err);
            } else {
              console.log(docs);
              res.redirect("/pwa/collections");
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
    console.log("Error, collectible doesn't exist.");
    console.error(err);
    await res.render("app/earn-collectible", {
      title: "Earn a Collectible | GoGamify",
      messages: { error: "Collectible does not exist." },
    });
  }
};

const student_collections_get = async (req, res) => {
  console.log("Retrieving collections from DB...");

  await Student.findById(req.session.user.profile, (err, doc) => {
    if (err) {
      console.log("Error while accessing the document.");
      console.log(err);
    } else {
      // console.log("Document", doc);
      // console.log("collections", doc.collections);
      handleCollections(doc);
      res.send(JSON.stringify(doc.collections));
    }
  })
    .clone()
    .catch((err) => {
      console.log("Retrieval failed.");
      console.log(err);
    });
};

const handleCollections = (user) => {
  console.log("collections", user.resources.length);
  console.log("collections", user.completed.length);
  // console.log("collections:", user);
  if (user.completed.length > 1) {
    console.log("greater 1");
  }

  if (user.completed.length > 3) {
    console.log("more than 3");
  }
};

const student_collections_delete = async (req, res) => {};

const student_current_page_get = async (req, res) => {
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

          <h2 class="h2 text-center mb-5">No chosen journey yet.</h2>
        <a class="button button--cta px-3 w-full max-w-sm py-2" href="/pwa/journey">My Journeys</a>
        <a class="button button--cta px-3 w-full max-w-sm py-2" href="/pwa/journey/browse">Explore All Journeys</a>
        <a class="button button--muted px-3 w-full max-w-sm py-2" href="/resource/join">Join using code</a>
        </section>`;
          console.log("No user resources available...");
          console.log("Sending browse journey prompt instead...");
          const jsonData = { body: promptBrowse };
          res.send(jsonData);
        } else {
          const firstModule = doc.resources[0].modules[0];
          const currentResource = doc.resources[0];

          const currentPageNumberOfResource = findResourceCurrentPageNumber(
            currentResource,
            doc.resourcesCurrentPages
          );

          const targetPageNumber =
            currentPageNumberOfResource == -1 ? 0 : currentPageNumberOfResource;

          console.log("targetResourceCurrentPage", targetPageNumber);

          /**
           * Initialize first module as the current page and page number,
           * then send as a response
           */
          Student.findByIdAndUpdate(
            req.session.user.profile,
            {
              currentPage: firstModule,
              currentPageNumber: targetPageNumber,
              currentPageIndex: 0,
            },
            (err, docs) => {
              if (err) {
                console.log("Error occurred");
                console.log(err);
              } else {
                // console.log(docs);
                const targetHeader = currentResource;
                targetHeader.currentPageNumber = targetPageNumber;
                const jsonData = { header: targetHeader, body: firstModule };
                res.send(JSON.stringify(jsonData));
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
        const targetModule =
          doc.resources[targetResourceIndex].modules[targetModulesIndex];

        const targetHeader = doc.resources[targetResourceIndex];
        targetHeader.currentPageNumber = doc.currentPageNumber;

        const jsonData = {
          header: targetHeader,
          body: targetModule,
        };
        res.send(JSON.stringify(jsonData));
      }
    }
  })
    .clone()
    .catch((err) => {
      console.log("Retrieval failed.");
      console.log(err);
    });
};

const student_current_page_post = async (req, res) => {
  console.log("Current page post request....");

  await LearningResource.findOne({ _id: req.body._id }).then(
    async (resource) => {
      Student.findById(req.session.user.profile, (err, doc) => {
        if (err) {
          console.log("Error while accessing the document.");
          console.log(err);
        } else {
          const indexOfExisting = findResource(resource, doc.resources);
          const targetIndex =
            indexOfExisting === -1 ? doc.resources.length - 1 : indexOfExisting;

          const currentPageNumberOfResource = findResourceCurrentPageNumber(
            resource,
            doc.resourcesCurrentPages
          );

          const targetPageNumber =
            currentPageNumberOfResource == -1 ? 0 : currentPageNumberOfResource;

          console.log("targetResourceCurrentPage", targetPageNumber);

          const outgoingResource = doc.resources[doc.currentPageIndex];
          const targetModule = doc.resources[targetIndex].modules[0];

          Student.findByIdAndUpdate(
            req.session.user.profile,
            {
              currentPage: targetModule,
              currentPageNumber: targetPageNumber,
              currentPageIndex: targetIndex,
            },
            (err, docs) => {
              if (err) {
                console.log("Error occurred");
                console.log(err);
                const setFilter = `resourcesCurrentPages.${targetIndex}`;
              } else {
                console.log(
                  "Updating resourcesCurrentPages with target!:",
                  outgoingResource._id,
                  outgoingResource.title
                );
                Student.updateOne(
                  {
                    _id: req.session.user.profile,
                    "resourcesCurrentPages.id": outgoingResource._id,
                  },
                  {
                    $set: {
                      "resourcesCurrentPages.$.id": outgoingResource._id,
                      "resourcesCurrentPages.$.currentPageNumber":
                        doc.currentPageNumber,
                    },
                  },
                  {
                    safe: true,
                    upsert: true,
                  },
                  (err, docs) => {
                    if (err) {
                      console.log("Error occurred");
                      console.log(err);
                    } else {
                      console.log("Success!");
                      res.redirect("/home");
                    }
                  }
                )
                  .clone()
                  .catch((err) => {
                    console.log(err);
                    console.log(
                      "Error, resource non-existing, creating the object instead...."
                    );
                    Student.findByIdAndUpdate(
                      req.session.user.profile,
                      {
                        $addToSet: {
                          resourcesCurrentPages: {
                            id: outgoingResource._id,
                            currentPageNumber: doc.currentPageNumber,
                          },
                        },
                      },
                      {
                        safe: true,
                        upsert: true,
                      },
                      (err, docs) => {
                        if (err) {
                          console.log("Error occurred");
                          console.log(err);
                        } else {
                          res.redirect("/home");
                        }
                      }
                    )
                      .clone()
                      .catch((err) => {
                        console.log(err);
                      });
                  });
              }
            }
          )
            .clone()
            .catch((err) => {
              console.log(err);
            });
        }
      })
        .clone()
        .catch((err) => {
          console.log("Retrieval failed.");
          console.log(err);
        });
    }
  );
};

const findResourceCurrentPageNumber = (resource, resourcesCurrentPages) => {
  console.log("findResourceCurrentPage", resource.title);
  console.log("findResourceCurrentPage", resourcesCurrentPages);

  for (let i = 0; i < resourcesCurrentPages.length; i++) {
    console.log(
      "comparing",
      resourcesCurrentPages[i].id.toString(),
      resource._id.toString()
    );
    // toString allows proper comparing of resource IDs
    if (resourcesCurrentPages[i].id.toString() == resource._id.toString()) {
      console.log("MATCHED!");
      return resourcesCurrentPages[i].currentPageNumber;
    }
  }

  return -1;
};

const student_page_next = async (req, res) => {
  console.log("Retrieving resources from DB...");
  await Student.findById(req.session.user.profile, (err, doc) => {
    if (err) {
      console.log("Error while accessing the document.");
      console.log(err);
    } else {
      console.log("current page number: ", doc.currentPageNumber);
      console.log(
        "current page limit: ",
        doc.resources[doc.currentPageIndex].pages
      );

      const targetPageNumber = doc.currentPageNumber + 1;
      const currentPageLimit = doc.resources[doc.currentPageIndex].pages;
      const currentResource = doc.resources[doc.currentPageIndex];

      if (targetPageNumber < currentPageLimit) {
        Student.findByIdAndUpdate(
          req.session.user.profile,
          {
            $inc: { currentPageNumber: 1 },
          },
          (err, docs) => {
            if (err) {
              console.log("Error occurred");
              console.log(err);
            } else {
              console.log("Page number INCREMENT success.");
              console.log("Current page number:", docs.currentPageNumber);

              console.log(
                "Saving resource page state...",
                currentResource._id,
                currentResource.title,
                targetPageNumber
              );
              Student.updateOne(
                {
                  _id: req.session.user.profile,
                  "resourcesCurrentPages.id": currentResource._id,
                },

                {
                  $set: {
                    "resourcesCurrentPages.$.id": currentResource._id,
                    "resourcesCurrentPages.$.currentPageNumber":
                      targetPageNumber,
                  },
                },
                {
                  safe: true,
                  upsert: true,
                },
                (err, docs) => {
                  if (err) {
                    console.log("Error occurred");
                    console.log(err);
                  } else {
                    // console.log(docs);
                    res.redirect("/home");
                  }
                }
              )
                .clone()
                .catch((err) => {
                  console.log(err);
                });
            }
          }
        ).catch((err) => {
          console.log(err);
        });
      } else {
        const targetResource = doc.resources[doc.currentPageIndex];

        console.log("Removing doc to resources array: ", targetResource._id);

        Student.findByIdAndUpdate(
          req.session.user.profile,
          {
            $pull: { resources: targetResource },
          },
          (err, docs) => {
            if (err) {
              console.log("Error, getting document data.");
              console.log(err);
            } else {
              Student.findByIdAndUpdate(
                req.session.user.profile,
                {
                  currentPage: null,
                  currentPageNumber: 0,
                  currentPageIndex: null,
                },
                (err, docs) => {
                  if (err) {
                    console.log("Error, getting document data.");
                    console.log(err);
                  } else {
                    console.log(
                      "Removing resource in current page tracker array..."
                    );
                    Student.findByIdAndUpdate(
                      req.session.user.profile,
                      {
                        $pull: {
                          resourcesCurrentPages: {
                            id: targetResource._id,
                          },
                        },
                      },
                      {
                        safe: true,
                        upsert: true,
                      },
                      (err, docs) => {
                        if (err) {
                          console.log("Error occurred");
                          console.log(err);
                        } else {
                          // res.send(JSON.stringify(targetModule));
                          // res.redirect("/home");
                        }
                      }
                    )
                      .clone()
                      .catch((err) => {
                        console.log(err);
                      });

                    Student.findByIdAndUpdate(
                      req.session.user.profile,
                      { $addToSet: { completed: targetResource } },
                      { safe: true, upsert: true },
                      (err, docs) => {
                        if (err) {
                          console.log("Error, getting document data.");
                          console.log(err);
                        } else {
                          // console.log(docs);
                          res.redirect("/pwa/journey/completed");
                        }
                      }
                    )
                      .clone()
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                }
              )
                .clone()
                .catch((err) => {
                  console.log(err);
                });
            }
          }
        )
          .clone()
          .catch((err) => {
            console.log(err);
          });
      }
    }
  })
    .clone()
    .catch((err) => {
      console.log("Retrieval failed.");
      console.log(err);
    });
};

const student_page_prev = async (req, res) => {
  console.log("Retrieving resources from DB...");
  await Student.findById(req.session.user.profile, (err, doc) => {
    if (err) {
      console.log("Error while accessing the document.");
      console.log(err);
    } else {
      console.log("current page number: ", doc.currentPageNumber);
      console.log(
        "current page limit: ",
        doc.resources[doc.currentPageIndex].pages
      );

      const targetPageNumber = doc.currentPageNumber - 1;
      const currentResource = doc.resources[doc.currentPageIndex];

      if (targetPageNumber < 0) {
        res.redirect("/pwa/module");
      } else {
        Student.findByIdAndUpdate(
          req.session.user.profile,
          {
            $inc: { currentPageNumber: -1 },
          },
          (err, docs) => {
            if (err) {
              console.log("Error occurred");
              console.log(err);
            } else {
              console.log("Page number DECREMENT success.");
              console.log("Current page number:", docs.currentPageNumber);

              console.log(
                "Saving resource page state...",
                currentResource._id,
                currentResource.title,
                targetPageNumber
              );

              Student.updateOne(
                {
                  _id: req.session.user.profile,
                  "resourcesCurrentPages.id": currentResource._id,
                },

                {
                  $set: {
                    "resourcesCurrentPages.$.id": currentResource._id,
                    "resourcesCurrentPages.$.currentPageNumber":
                      targetPageNumber,
                  },
                },
                {
                  safe: true,
                  upsert: true,
                },
                (err, docs) => {
                  if (err) {
                    console.log("Error occurred");
                    console.log(err);
                  } else {
                    res.redirect("/home");
                  }
                }
              )
                .clone()
                .catch((err) => {
                  console.log(err);
                });
            }
          }
        ).catch((err) => {
          console.log(err);
        });
      }
    }
  })
    .clone()
    .catch((err) => {
      console.log("Retrieval failed.");
      console.log(err);
    });
};

const profile_get = async (req, res) => {
  await Student.findById(req.session.user.profile, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successful");
      // console.log("doc", doc);
      // console.log("docType", typeof doc);
      // console.log(doc);
      res.send(JSON.stringify(doc));
    }
  })
    .clone()
    .catch((err) => {
      console.log(err);
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
      // console.log("doc", doc);
      // console.log("docType", typeof doc);
      console.log(doc.preferences);
      res.send(JSON.stringify(doc.preferences));
    }
  })
    .clone()
    .catch((err) => {
      console.log(err);
    });
};

const community_school_get = async (req, res) => {
  await Student.findById(req.session.user.profile, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successful.");
      const userSchool = doc.school;
      console.log("User school:", userSchool);

      Student.find({ school: userSchool }, (err, doc) => {
        if (err) {
          console.log(err);
        } else {
          return doc;
        }
      })
        .clone()
        .then((schoolmates) => {
          let schoolTeachers;

          Teacher.find({ school: userSchool }, (err, doc) => {
            if (err) {
              console.log(err);
            } else {
              return doc;
            }
          })
            .clone()
            .then((teachers) => {
              console.log("Teachers", teachers);
              schoolTeachers = teachers;

              const schoolData = path.join(
                __dirname,
                "..",
                "data/schools.json"
              );

              fs.readFile(schoolData, (err, data) => {
                if (err) {
                  console.log("Error reading schools data...");
                  console.log(err);
                }

                const result = JSON.parse(data);
                result[userSchool]?.schoolmates.push(...schoolmates);
                result[userSchool].teachers = schoolTeachers;
                console.log("User Community: ", result);

                res.send(JSON.stringify(result[userSchool]));
              });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  })
    .clone()
    .catch((err) => {
      console.log(err);
    });
};

const student_stats_assess = async (req, res) => {
  console.log("Retrieving resources from DB...");
  await Student.findById(req.session.user.profile, (err, doc) => {
    if (err) {
      console.log("Error while accessing the document.");
      console.log(err);
    } else {
      return doc;
    }
  })
    .clone()
    .then((doc) => {
      const resources = doc.resources;
      const completed = doc.completed;

      console.log("resources.length", resources.length);
      console.log("completed.length", completed.length);

      const dbReference = {
        completed: {
          1: {
            id: "62a4a1b3f56bf2a8970c8f1a",
          },
          3: {
            id: "62a4a23bf56bf2a8970c8f20",
          },
        },
        resources: {
          1: {
            id: "62a4a2eff56bf2a8970c8f32",
          },
          3: {
            id: "62a4a304f56bf2a8970c8f38",
          },
        },
      };

      console.log("dbref", dbReference.completed[3].id);

      let targetCollectibleIds = [];

      if (completed.length >= 100) {
      } else if (completed.length >= 1) {
        targetCollectibleIds.push(dbReference.completed[1].id);
      } else {
        console.log("No earned collectible for completed.");
      }

      if (resources.length >= 100) {
      } else if (resources.length >= 1) {
        targetCollectibleIds.push(dbReference.resources[1].id);
      } else {
        console.log("No earned collectible for resources.");
      }

      console.log("targetCollectibleIds", targetCollectibleIds);
      return targetCollectibleIds;
    })
    .then((targetCollectibleIds) => {
      // Source: https://newbedev.com/mongodb-mongoose-findmany-find-all-documents-with-ids-listed-in-array
      const earnedCollectibles = Collectible.find()
        .where("_id")
        .in(targetCollectibleIds)
        .exec();

      console.log("earnedCollectibles!", earnedCollectibles);
      return earnedCollectibles;
    })
    .then((data) => {
      console.log("Statszxc!", data);

      const assessment = {};
      assessment.body = [];
      assessment.messages = data;
      res.send(JSON.stringify(assessment));
    })

    .catch((err) => {
      console.log("Retrieval failed.");
      console.log(err);
    });
};

module.exports = {
  student_index,
  student_post,
  student_get,
  student_put,
  student_delete,
  student_resources_get,
  student_resources_post,
  student_resources_delete,
  student_resources_pages_get,
  student_completed,
  student_current_page_get,
  student_current_page_post,
  student_page_next,
  student_page_prev,
  student_collections_post,
  student_collections_get,
  student_collections_delete,
  profile_get,
  profile_preference_post,
  profile_preference_get,
  community_school_get,
  student_stats_assess,
};
