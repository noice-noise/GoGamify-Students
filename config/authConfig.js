module.exports = {
  ensureAuthenticated: function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("auth/login");
  },

  forwardAuthenticated: function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/home");
    }

    return next();
  },

  forwardFirstLogin: function checkFirstLogin(req, res, next) {
    if (req.user.profile === undefined || req.user.profile == "NA") {
      return res.redirect("/get-started");
    }

    return next();
  },

  forwardAdmin: function checkAdminRole(req, res, next) {
    if (req.user.role === "admin") {
      return res.redirect("/admin");
    }

    return next();
  },
};
