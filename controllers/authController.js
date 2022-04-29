const login = (req, res) => {
  res.render("auth/login", { title: "Login | GoGamify" });
};

const register = (req, res) => {
  res.render("auth/register", { title: "Register | GoGamify" });
};

const register_student = (req, res) => {
  res.render("auth/register-student", { title: "Student Register | GoGamify" });
};

module.exports = {
  login,
  //   login_verify,
  register,
  register_student,
  //   register_teacher,
};
