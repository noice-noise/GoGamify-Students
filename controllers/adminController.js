const admin_index = (req, res) => {
  res.render("admin/index", { title: "Admin" });
};

module.exports = {
  admin_index,
};
