const admin_index = (req, res) => {
  console.log("Admin index...");
  res.render("admin/index", { title: "Admin" });
};

module.exports = {
  admin_index,
};
