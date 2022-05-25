if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");

const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoute");
const gamifyRoutes = require("./routes/gamifyRoutes");
const learningResourceRoutes = require("./routes/learningResourceRoutes");
const pwaRoutes = require("./routes/pwaRoutes");
const collectionRoutes = require("./routes/collectionRoutes");

const app = express();

console.log("App running...");

const PORT = process.env.PORT || 3000;

const passportConfig = require("./config/passportConfig");
const {
  ensureAuthenticated,
  forwardFirstLogin,
  forwardAdmin,
  setAuthCookie,
} = require("./config/authConfig");

passportConfig(passport);

/**
 * MongoDB connection with internet connectivity check
 */
require("dns").resolve("www.google.com", function (err) {
  console.log("Checking Internet connectivity...");
  if (err) {
    console.log("No connection");
    listen();
  } else {
    console.log("Attempting to connect to database...");
    const dbURI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}-@${process.env.DATABASE}.afth4.mongodb.net/goGamifyDB?retryWrites=true&w=majority`;
    mongoose
      .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((result) => {
        console.log("Database connection success...");
        listen();
      })
      .catch((err) => {
        console.log("Database connection failed.");
        console.log(err);
      });
  }
});

const listen = () => {
  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`App is listening on port http://localhost:${PORT}/`);
  });
};

/***
 * Middlewares
 */
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

/**
 * Routes
 */
app.use("/admin", ensureAuthenticated, adminRoutes);
app.use("/auth", authRoutes);

app.use("/home", setAuthCookie, forwardAdmin, forwardFirstLogin, (req, res) => {
  // console.debug("USER request: ", req.user);
  // console.debug("USER session: ", req.session.user);
  // console.debug("USER cookies: ", req.cookies.user);
  res.redirect("/pwa/learning-module/module.html");
});

app.use("/get-started", (req, res) => {
  res.render("app/get-started", {
    title: "Update Profile | GoGamify",
    user: req.session.user,
  });
});

app.use("/pwa", pwaRoutes);
app.use("/gamify", gamifyRoutes);
app.use("/resource", learningResourceRoutes);
// app.use("/student", ensureAuthenticated, studentRoutes);
// app.use("/collection", ensureAuthenticated, collectionRoutes);
app.use("/student", studentRoutes);
app.use("/collection", collectionRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "Page not found." });
});
