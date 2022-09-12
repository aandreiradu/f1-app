const Users = require('../model/Users');
const multer = require('multer');


const updateUserInfo = async(req,res) => {
    const { username,email,favoriteDriver,favoriteConstructor,fullName } = req.body;

    // todo : finish update info route

}