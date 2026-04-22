const { createHttpError } = require("../utils/apiResponse");

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(createHttpError(401, "Unauthorized request."));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(createHttpError(403, "You do not have access to this resource."));
    }

    return next();
  };
};

module.exports = { authorizeRoles };
