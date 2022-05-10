module.exports = {
  ensureAuthenticated: function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("auth/login");
  },

  forwardAuthenticated: function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated() || req.cookies.user !== undefined) {
      return res.redirect("/home");
    }

    return next();
  },

  forwardFirstLogin: function checkFirstLogin(req, res, next) {
    if (
      req.user.profile === undefined &&
      req.cookies.user.profile === undefined
    ) {
      return res.redirect("/get-started");
    }

    return next();
  },

  forwardAdmin: function checkAdminRole(req, res, next) {
    if (req.user?.role === "admin" || req.cookies?.user === "admin") {
      return res.redirect("/admin");
    }

    return next();
  },

  setAuthCookie: function setAuthCookie(req, res, next) {
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

    res.cookie("user", req.user, {
      maxAge: ONE_DAY_IN_MS,
      httpOnly: true,
    });

    return next();
  },
};
