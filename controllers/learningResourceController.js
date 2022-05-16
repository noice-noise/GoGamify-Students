const LearningResource = require("../models/learningResource");

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

const learning_resource_post = (req, res) => {
  console.log("Saving");
  console.log(req.body);

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
  console.log(id);
  console.log("User: ", req.session.user);
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
  console.log(req.body);
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

module.exports = {
  learning_resource,
  learning_resource_post,
  learning_resource_get,
  learning_resource_put,
  learning_resource_delete,
};
