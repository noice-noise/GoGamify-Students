const bcrypt = require("bcrypt");

const User = require("../models/user");

const login = (req, res) => {
  // console.log("user", req.user);
  // req.session.Auth = req.body.user; // => user values?
  res.render("auth/login", { title: "Login | GoGamify", user: req.user });
};

const register = async (req, res) => {
  res.render("auth/register", { title: "Register | GoGamify" });
};

const register_post = async (req, res) => {
  console.log(req.body);
  console.log(req.body.password);
  const hashedPassword = bcrypt.hash(req.body.password, 10);

  const user = new User({
    email: req.body.email,
    password: (await hashedPassword).toString(),
    profile: req.body.profile,
    role: req.body.role,
  });

  await user
    .save()
    .then(() => {
      res.redirect("/auth/login");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Sorry, something went wrong.",
      });
    });
};

const register_account = (req, res) => {
  res.render("auth/register-account", { title: "Student Register | GoGamify" });
};

const register_student = (req, res) => {
  res.render("auth/register-student", { title: "Student Register | GoGamify" });
};

const register_student_post = async (req, res) => {
  // console.log("user...", req.user);
  // console.log("form...", req.body);
  // const user = req.user;
  // user.profile = req.body;

  // await User.findOneAndUpdate(req.user, user).then((res) => {
  //   console.log("Priofffleee:", res);
  //   res.profile = req.body;
  // });

  // console.log("after user...", req.user);
  // console.log("after user...", user);
  res.redirect("/home");
};

const logout = (req, res) => {
  console.log("User logged out");
  res.clearCookie("user");
  req.logOut();
  res.redirect("/auth/login");
};

module.exports = {
  login,
  logout,
  register,
  register_post,
  register_account,
  register_student,
  register_student_post,
};
