const Users = require("../model/Users");
const JSONWEBTOKEN = require("jsonwebtoken");
const SECURITY_ROLES = require("../config/securityRolesList");

const handleRefreshToken = async (req, res) => {
  console.log("START REFRESH TOKEN");
  const { jwt } = req.cookies;
  console.log("jwt cookie", jwt);

  // clear the refresh token from the cookie - http only.
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

  if (!jwt) {
    console.log("nu are jwt pe cookie, return 401");
    return res.status(401).json({ message: "Unauthorized", statusCode: 401 });
  }

  try {
    const refreshToken = jwt;
    const findUser = await Users.findOne({ refreshToken })
      // .populate([
      //   {
      //     path: "favoriteProducts",
      //     populate: {
      //       path: "productId",
      //     },
      //   },
      //   {
      //     path: "favoriteProducts.productId",
      //     populate: {
      //       path: "teamId",
      //     },
      //   },
      // ])
      .exec();

    if (!findUser) {
      JSONWEBTOKEN.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) {
            return res
              .stauts(403)
              .json({ message: "Forbidden", statusCode: 403 });
          }

          // delete the refresh token from the hacked user;
          const hackedUser = await Users.findOne({
            username: decoded?.username,
          }).exec();
          if (hackedUser.refreshToken) {
            hackedUser.refreshToken = [];
          }
          await hackedUser.save();
        }
      );
      return res.status(403).json({ message: "Forbidden", statusCode: 403 });
    }

    const newRefreshTokenArray = findUser?.refreshToken?.filter(
      (rt) => rt !== refreshToken
    );

    JSONWEBTOKEN.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decode) => {
        console.log("verify jwt err ", err);
        console.log("verify jwt decode", decode);
        if (err || findUser.username !== decode.username) {
          // jwt expired or username not decoded; => clear the cookie and redirect to login;
          findUser.refreshToken = [...newRefreshTokenArray];
          await findUser.save();

          return res
            .status(403)
            .clearCookie("jwt", {
              httpOnly: true,
              secure: true,
              maxAge: 24 * 60 * 60 * 1000,
            })
            .json({ message: "Forbidden", statusCode: 403 });
        }

        // refresh token valid here
        const rolesIds = Object.values(findUser?.roles)?.filter((b) =>
          Boolean(b)
        );

        const isAdmin = rolesIds.some(
          (role) =>
            +role === +SECURITY_ROLES.Admin || +role === +SECURITY_ROLES.Host
        );
        console.log("isAdmin refresh token", isAdmin);

        const generateNewAccessToken = JSONWEBTOKEN.sign(
          {
            F1_APP_USER: {
              userId: findUser._id.toString(),
              username: findUser.username,
              email: findUser.email,
              fullName: findUser.fullName,
              roles: rolesIds,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
        console.log("generateNewAccessToken", generateNewAccessToken);

        const generateNewRefreshToken = JSONWEBTOKEN.sign(
          { username: findUser?.username },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        // save the refresh token with the current user;
        findUser.refreshToken = [
          ...newRefreshTokenArray,
          generateNewRefreshToken,
        ];
        await findUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie("jwt", generateNewRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
          accessToken: generateNewAccessToken,
          roles: rolesIds,
          isAdmin,
          fullName: findUser?.fullName,
          username: findUser?.username,
          email: findUser?.email,
          favoriteDriver: findUser?.favoriteDriver,
          favoriteConstructor: findUser.favoriteConstructor,
          imageUrl: findUser.imageUrl,
          favoriteProducts: findUser?.favoriteProducts,
          favoriteProductsCount: findUser.favoriteProducts.length,
          cartItemsCount: findUser.cart.items.length,
        });
      }
    );

    console.log("STOP REFRESH TOKEN");
  } catch (error) {
    console.log("error refreshController for refreshToken", jwt);
    return res
      .status(500)
      .json({ message: "Internal Server Error", statusCode: 500 });
  }
};

module.exports = handleRefreshToken;
