module.exports = {
  ensureAuthenticated: function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("auth/login");
  },

  forwardAuthenticated: function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/");
    }

    return next();
  },
};
