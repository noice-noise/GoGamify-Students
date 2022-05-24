const Collectible = require("../models/collectible");
let isOffline;

const collectible = (req, res) => {
  Collectible.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      console.log("Number of Collectible: ", result.length);
      res.send(JSON.stringify(result));
    })
    .catch((err) => {
      res.render("404", { title: "Sorry, something went wrong." });
    });
};

const collectible_index = (req, res) => {
  console.log("Collectible index...");

  if (isOffline) {
    console.log("App is currently running offline...");
    console.log("Cannot retrieve learning collection from DB...");
    res.render("collection/index", {
      title: "All Collection",
      collection: [],
      offline: true,
    });
  } else {
    console.log("App is currently running online...");
    console.log("Retrieving learning collection from DB...");
    Collectible.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        console.log("Number of Collectible: ", result.length);
        res.render("collection/index", {
          title: "All Collectible",
          collection: result,
          offline: false,
        });
      })
      .catch((err) => {
        res.render("404", { title: "Sorry, something went wrong." });
      });
  }
};

const collectible_browse = (req, res) => {
  console.log("Collectible browse...");

  if (isOffline) {
    console.log("App is currently running offline...");
    console.log("Cannot retrieve collectibles from DB...");
    res.render("collection/index", {
      title: "All Collectibles",
      collection: [],
      offline: true,
    });
  } else {
    console.log("App is currently running online...");
    console.log("Retrieving collectibles from DB...");
    Collectible.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        console.log("Number of collectibles: ", result.length);
        res.render("app/browse-collectibles", {
          title: "All Collectibles",
          collection: result,
          offline: false,
        });
      })
      .catch((err) => {
        res.render("404", { title: "Sorry, something went wrong." });
      });
  }
};

const collectible_post = (req, res) => {
  const collectible = new Collectible(req.body);

  collectible
    .save()
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log("ERROR saving collectible", err);
      res.render("404", { title: "Sorry, something went wrong." });
    });
};

const collectible_get = (req, res) => {
  console.log("collectible_get");
  const id = req.params.id;
  Collectible.findById(id)
    .then((result) => {
      res.render("collection/details", {
        title: "Collectible Details",
        collectible: result,
        user: req.session.user,
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("404", { title: "Sorry, something went wrong." });
    });
};

const collectible_put = (req, res) => {
  console.log("Updating collectible...");
  Collectible.findByIdAndUpdate(req.body._id, req.body, (err, docs) => {
    if (err) {
      console.log("PUT request error: ", err);
    } else {
      console.log("PUT success: ", docs);
      res.redirect("/collection");
    }
  })
    .then((result) => {
      console.log("Yess!!");
      res.json({ redirect: "/collection" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const collectible_delete = (req, res) => {
  const id = req.params.id;

  Collectible.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/collection" });
    })
    .catch((err) => {
      res.render("404", { title: "Sorry, something went wrong." });
    });
};

const collectible_data_get = (req, res) => {
  const id = req.params.id;
  Collectible.findById(id)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      res.render("404", { title: "Sorry, something went wrong." });
    });
};

const collectible_earn = async (req, res) => {
  await res.render("app/earn-collectible", {
    title: "Earn a Collectible | GoGamify",
  });
};

const collectible_create = (req, res) => {
  console.log("Collectible create...");
  res.render("collection/create", {
    title: "Gamify Collectible | GoGamify",
    user: req.session.user,
  });
};

module.exports = {
  collectible,
  collectible_browse,
  collectible_index,
  collectible_create,
  collectible_post,
  collectible_get,
  collectible_put,
  collectible_delete,
  collectible_data_get,
  collectible_earn,
};
