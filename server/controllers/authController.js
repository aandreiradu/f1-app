const User = require("../model/Users");
const bcrpy = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  const cookies = req.cookies;
  console.log(username, password);
  console.log(req.headers);
  console.log("cookies", cookies);

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required!",
      statusCode: 400,
    });
  }

  try {
    const searchUser = await User.findOne({ username }).exec();
    if (!searchUser) {
      return res
        .status(401)
        .json({ message: "User not found", statusCode: 401 });
    }

    const match = await bcrpy.compare(password, searchUser.password);
    if (!match) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password", statusCode: 401 });
    }

    // generate access token
    const roles = Object.values(searchUser?.roles)?.filter((b) => Boolean(b));
    console.log("roles authController", { userRoles: searchUser.roles, roles });
    const generateAccessToken = jwt.sign(
      {
        F1_APP_USER: {
          userId: searchUser?._id.toString(),
          username: searchUser?.username,
          email: searchUser?.email,
          fullName: searchUser?.fullName,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // generate refresh token and set in cookies
    const generateRefreshToken = jwt.sign(
      { username: searchUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Changed to let keyword
    let newRefreshTokenArray = !cookies?.jwt
      ? searchUser.refreshToken
      : searchUser.refreshToken.filter((rt) => rt !== cookies.jwt);

    if (cookies?.jwt) {
      /* 
          Scenario added here: 
              1) User logs in but never uses RT and does not logout 
              2) RT is stolen
              3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
          */
      const refreshToken = cookies.jwt;
      const foundToken = await User.findOne({ refreshToken }).exec();

      // Detected refresh token reuse!
      if (!foundToken) {
        // clear out ALL previous refresh tokens
        newRefreshTokenArray = [];
      }

      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    }

    // Saving refreshToken with current user
    searchUser.refreshToken = [...newRefreshTokenArray, generateRefreshToken];
    await searchUser.save();

    console.log({
      accessToken: generateAccessToken,
      refreshToken: generateRefreshToken,
    });

    // set refresh token at cookie level - httpOnly level
    res.cookie("jwt", generateRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({
      statusCode: 201,
      accessToken: generateAccessToken,
      fullName: searchUser?.fullName,
      roles,
      username,
      email: searchUser?.email,
      favoriteConstructor: searchUser?.favoriteConstructor,
      favoriteDriver: searchUser?.favoriteDriver,
      imageUrl: searchUser?.imageUrl,
    });
  } catch (error) {
    console.log("error authController", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = handleLogin;
