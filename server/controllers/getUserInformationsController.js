const Users = require('../model/Users')


const getUserInfo = async (req,res) => {
    const { username }  = req.body;
    console.log('username',username);
    const { jwt } = req.cookies;

    if(!username) {
        console.log('no username provided in body');
        return res.status(200).json({message : `Couldnt found any data  in database for username: ${username}`, statusCode : 204})
    }

    const searchUserByUsername = await Users.findOne({username}).exec();

    if(!searchUserByUsername){
        console.log(`For username ${username}, there are no data stored in database`);
        return res.status(200).json({message : `Couldnt found any data  in database for user ${username}`, statusCode : 204})
    }

    const { username : usernameResponse,email,fullName,favoriteDriver,favoriteConstructor } = searchUserByUsername;
    return res
      .status(200)
      .json({
        statusCode: 200,
        username: usernameResponse,
        email,
        fullName,
        favoriteDriver,
        favoriteConstructor,
      });

};

module.exports = getUserInfo;