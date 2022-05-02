const bcrypt = require("bcrypt");

const User = require("../models/user");

const login = (req, res) => {
  res.render("auth/login", { title: "Login | GoGamify" });
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

const register_student = (req, res) => {
  res.render("auth/register-student", { title: "Student Register | GoGamify" });
};

const logout = (req, res) => {
  console.log("User logging out");
  req.logOut();
  res.redirect("/auth/login");
};

module.exports = {
  login,
  logout,
  register,
  register_post,
  register_student,
};
