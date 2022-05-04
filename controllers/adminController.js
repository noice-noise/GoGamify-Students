const admin_index = (req, res) => {
  res.render("admin/index", { title: "Admin", user: req.user });
};

module.exports = {
  admin_index,
};
