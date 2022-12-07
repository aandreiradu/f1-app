const Users = require("../model/Users");
const { default: mongoose } = require("mongoose");
const path = require("path");
const { removeFile } = require("../utils/files");

const updateProfilePicture = async (req, res, next) => {
  const { username } = req.body;

  if (!username || !req.file || !req.userId) {
    console.log({
      username,
      file: req.file,
      uid: req.userId,
    });
    const error = new Error("Invalid request params");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const imageUrl = req?.file?.path;
    const findUserByUsername = await Users.findOne({
      username: username,
      _id: mongoose.Types.ObjectId(req.userId),
    }).exec();

    console.log("findUserByUsername", findUserByUsername);
    if (!findUserByUsername) {
      console.log("No user found for provided params", username, req.userId);
      const error = new Error("No account found for given username");
      error.statusCode = 401;
      return next(error);
    }

    // delete the old profile picture from images if the current files.path is different from the one saved in the database;
    if (imageUrl !== findUserByUsername.imageUrl) {
      console.log("different path, delelete the old photo");
      removeFile(path.join(__dirname, "..", findUserByUsername.imageUrl));
    }

    findUserByUsername.imageUrl = imageUrl;

    await findUserByUsername.save();

    console.log(`Image uploaded successfully for username ${username}`);
    return res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    console.log("error catch block", error);
  }
};

module.exports = { updateProfilePicture };
