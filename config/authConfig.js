module.exports = {
  ensureAuthenticated: function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else if (req.cookies.user !== undefined) {
      console.log("Retrieved authentication cookies...");
      req.user = req.cookies.user;
      req.session.user = req.cookies.user;
      return next();
    }

    res.redirect("auth/login");
  },

  forwardAuthenticated: function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/home");
    } else if (req.cookies.user !== undefined) {
      console.log("Retrieved authentication cookies...");
      req.user = req.cookies.user;
      req.session.user = req.cookies.user;
      return res.redirect("/home");
    }

    return next();
  },

  forwardFirstLogin: function checkFirstLogin(req, res, next) {
    console.log("First login");

    console.log("USER request: ", req.user);
    console.log("USER session: ", req.session.user);
    console.log("USER cookies: ", req.cookies.user);
    if (
      req.session.user !== undefined &&
      (req.session.user?.profile === undefined ||
        req.session.user?.profile === "NA") &&
      (req.cookies.user?.profile === undefined ||
        req.cookies.user?.profile === "NA")
    ) {
      console.log("Profile not updated");
      return res.redirect("/get-started");
    }

    return next();
  },

  forwardAdmin: function checkAdminRole(req, res, next) {
    if (req.session.user?.role === "admin" || req.cookies?.user === "admin") {
      return res.redirect("/admin");
    }

    return next();
  },

  setAuthCookie: function setAuthCookie(req, res, next) {
    if (req.cookies.user !== undefined) {
      req.session.user = req.cookies.user;
      return next();
    } else {
      req.session.user = req.user;
    }

    console.log("User cookies set...");
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

    res.cookie("user", req.session.user, {
      maxAge: ONE_DAY_IN_MS,
      httpOnly: true,
    });

    return next();
  },
};
