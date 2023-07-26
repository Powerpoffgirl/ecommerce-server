const isAuth = (req, res, next) => {
  if (req.session.isAuth && req.session.user) {
    // If the session has 'isAuth' set to true and 'user' property is present
    // it means the user is authenticated and their information is available
    req.user = req.session.user; // Set the 'user' property in 'req' to the session's 'user' property
    next();
  } else {
    return res.send({
      status: 400,
      message: "Invalid Session, Please login Again",
    });
  }
};

module.exports = { isAuth };
