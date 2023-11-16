const jwt = require("jsonwebtoken");
const { createError } = require("./error.js");

const verifyToken = (req, res, next) => {
  // const token = req.params.access_token;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // console.log("ini token dari verify " + token)

  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(createError(403, "Token is Invalid"));
    }
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
          return next(createError(403, "You are not authorized!"));
      }
    });
  };

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        next();
    });
  };

module.exports = {
  verifyToken,
  verifyUser,
  verifyAdmin
}