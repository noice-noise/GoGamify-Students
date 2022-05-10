const admin_index = (req, res) => {
  res.render("admin/index", { title: "Admin", user: req.session.user });
};

module.exports = {
  admin_index,
};
