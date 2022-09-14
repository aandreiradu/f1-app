const Users = require('../model/Users');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set Storage Engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../uploads'));
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  
const upload = multer({
    storage,
    // limits : {fileSize : 1 * 1024 * 1024} //limit to 1mb
    fileFilter: (req, file, callback) => {
        const acceptableExtensions = ['png', 'jpg', 'jpeg', 'jpg'];
        if (!(acceptableExtensions.some(extension => 
            path.extname(file.originalname).toLowerCase() === `.${extension}`)
        )) {
            return callback(new Error(`Extension not allowed, accepted extensions are ${acceptableExtensions.join(',')}`))
        }
        callback(null, true)
    }
})


const updateProfilePicture = async (req, res) => {
  console.log("req.file", req.file);
  const { username, imageName } = req.body;
  console.log("req.body", username, imageName);

  
  try {
    const findUserByUsername = await Users.findOne({ username }).exec();

    if (!findUserByUsername) {
      console.log('NU AM GASIT DATE IN DB PENTRU USERUL PRIMIT', username);
      return res.status(400).json({
        message: `Couldnt find any data in database for user ${username}`,
        statusCode: 400,
      });
    }

    
    if(!req.file) {
      return res.status(400).json({
        message : `No file provided`,
        statusCode : 400
      })
    };

    const newImg = fs.readFileSync(req.file.path);
    const encodedImg = newImg.toString('base64');
    const bufferImg = Buffer.from(encodedImg,'base64');

    findUserByUsername.profileImageName = imageName;
    findUserByUsername.profileImage = {
      data: bufferImg,
      contentType: "image/png",
    };

    await findUserByUsername.save();
    
    console.log(`Image uploaded successfully for username ${username}`);
    return res
      .status(200)
      .json({ message: "Image uploaded successfully", statusCode: 200, message: 'Profile picture uploaded successfully',data : bufferImg });
  } catch (error) {
    console.log("error catch block", error);
  }
};


module.exports = {updateProfilePicture,upload};


// TODO for tomorrow : handle unaccepted extensions. 
// Make request using sendRequest
// Loading state while the image is processed
