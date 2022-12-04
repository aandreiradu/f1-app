const Users = require("../../model/Users");
const SECURITY_ROLES = require("../../config/securityRolesList");

const itsAuthorized = async (req, res, next) => {
  console.log("@@@itsAuthorized req.userId", req.userId);
  try {
    const user = await Users.findById(req.userId);
    console.log("@@itsAuthorized middleware", user);

    if (!user) {
      const error = new Error("No account asociated with the requested userId");
      error.statusCode = 401;
      return next(error);
    }

    console.log("user roles", user?.roles);
    const rolesIds = Object.values(user?.roles)?.filter((b) => Boolean(b));
    const isAdmin = rolesIds.some(
      (role) =>
        +role === +SECURITY_ROLES.Admin || +role === +SECURITY_ROLES.Host
    );
    console.log("@@@isAdmin", isAdmin);

    if (!isAdmin) {
      const error = new Error(
        "This account is not authorized to add products to the shop"
      );
      error.statusCode = 403;
      return next(error);
    }

    return next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

module.exports = itsAuthorized;
