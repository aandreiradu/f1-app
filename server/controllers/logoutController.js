const Users = require("../model/Users");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  console.log("cookies", cookies);

  const { jwt } = cookies;
  console.log("jwt", jwt);

  if (!jwt) {
    console.log("n-are jwt setat");
    return res.status(204).json({ statusCode: 204 });
  }

  // find the user based on the refresh token
  try {
    const findByRefreshToken = await Users.findOne({
      refreshToken: jwt,
    }).exec();
    if (!findByRefreshToken) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res
        .status(204)
        .json({ message: "Logout successfully", statusCode: 204 });
    }

    // clear the refresh token
    console.log("Logout user found by refresh token", findByRefreshToken);

    findByRefreshToken.refreshToken = findByRefreshToken.refreshToken.filter(
      (rt) => rt !== jwt
    );
    await findByRefreshToken.save();

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    return res
      .status(200)
      .json({ statusCode: 200, message: "Logout completed" });
  } catch (error) {
    console.error("error logout", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleLogout };
