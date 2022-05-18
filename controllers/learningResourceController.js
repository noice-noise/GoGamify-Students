const LearningResource = require("../models/learningResource");
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

const learning_resource_post = (req, res) => {
  const learningResource = new LearningResource(req.body);
  // active means that the learning resource can be shown to public
  learningResource.active = req.body.active == "on" ? true : false;
  learningResource
    .save()
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log("ERROR saving resource", err);
      res.render("404", { title: "Sorry, something went wrong." });
    });
};

const learning_resource_get = (req, res) => {
  const id = req.params.id;
  LearningResource.findById(id)
    .then((result) => {
      res.render("gamify/details", {
        title: "Learning Resource Details",
        resource: result,
        user: req.session.user,
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("404", { title: "Sorry, something went wrong." });
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
  learning_resource_post,
  learning_resource_get,
  learning_resource_put,
  learning_resource_delete,
  learning_resource_data_get,
  learning_resource_join,
};
