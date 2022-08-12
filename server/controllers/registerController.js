
const User = require('../model/Users');
const bcrypt = require('bcrypt');
const { validateEmail,validateUserame,validatePassword  } = require('../utils/validators');


const registerNewUser = async (req,res) => {
    const { username,password,email,fullname } = req.body;
    console.log(email,username,password);

    if(!username || !password, !email || !fullname) {
        res.status(400).json({
            message: "Username,password and email are requred!",
            statusCode: 400
        });
    }

    if(!validateEmail(email)) {
        return res.status(400).json({message : 'Invalid email!'});
    } else if(!validateUserame(username)) {
        return res.status(400).json({message : 'Invalid username!'});
    }else if(!validatePassword(password)) {
        return res.status(400).json({message : 'Invalid password!'});
    }

    // find duplicates
    const duplicateUsername = await User.findOne({username}).exec();
    console.log('duplicateUsername',duplicateUsername);

    if(duplicateUsername) {
        return res.status(409).json({message : 'This username is already taken!', statusCode: 409});
    }

    // email used;
    const emailTaken = await User.findOne({email}).exec();
    if(emailTaken) {
        return res.status(409).json({message : 'This email is already in use!',statusCode : 409});
    }

    try {
        const hasedPassword = await bcrypt.hash(password,10);
        const createUser = await User.create({
            username,
            password : hasedPassword,
            email,
            fullName : fullname
        }); 

        console.log('createUser response',createUser);
        return res.status(201).json({message : `User ${username} has been created!`, statusCode: 201});

    } catch (error) {
        return res.status(500).json({message: `Internal server error ${error.message}`, statusCode : 500});
    }

}

module.exports = registerNewUser;