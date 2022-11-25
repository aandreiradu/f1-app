const fs = require("fs");

const removeFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw err;
    }
  });
};

module.exports = { removeFile };
