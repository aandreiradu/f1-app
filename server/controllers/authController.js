const User = require("../model/Users");
const bcrpy = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  console.log(req.headers);

  if (!username || !password) {
    return res
      .status(400)
      .json({
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
    const generateAccessToken = jwt.sign(
      {
        F1_APP_USER: {
          username: searchUser.username,
          email: searchUser.email,
          fullName: searchUser.fullName,
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

    // save refresh token in database;
    searchUser.refreshToken = generateRefreshToken;
    await searchUser.save();

    console.log({
      accessToken: generateAccessToken,
      refreshToken: generateRefreshToken,
    });

    // set refresh token at cookie level - httpOnly level

    return res
    .cookie("jwt", generateRefreshToken, {
      httpOnly: true,
      secure: true, //remove when testing with browser / keep it when testing with ThunderClient
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({ accessToken: generateAccessToken, statusCode: 201, fullName : searchUser?.fullName });
  } catch (error) {
    console.log("error authController", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = handleLogin;
