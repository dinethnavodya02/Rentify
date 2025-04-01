const adminMiddleware = (req, res, next) => {
  // Ensure user is authenticated and their type is available
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  // Check if the user is an admin
  if (req.user.type === "admin") {
    return res.redirect("/admin/dashboard"); // Redirect admin to dashboard
  }

  // If not an admin, proceed to the next middleware or route
  next();
};

module.exports = adminMiddleware;
