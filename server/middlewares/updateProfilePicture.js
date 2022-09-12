const multer = require('multer');
const path = require('path');

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

const uploadeProfilePictureMiddleware = (req,res,next) => {
    try {
        return upload.single("profilePicture")(req, res, () => {
          console.log("next called");
          next();
        }); 
    } catch (error) {
        console.log('error upload middleware',error);
        return res.status(400).json(error);
    }
}

module.exports = uploadeProfilePictureMiddleware