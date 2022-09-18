const Users = require('../model/Users');
const multer = require('multer');


const checkIfEmailIsUsed = async (email) => {
    return await Users.findOne({email}).exec();
}


const updateUserInfo = async(req,res) => {
    const { username,email,favoriteDriver,favoriteConstructor,fullName } = req.body;
    console.log('updateUserInfo received',req.body);

    if(!username) {
        return res.status(400).json({message : 'No username provided', statusCode : 400});
    }

    try {        
        const findUserbyUsername = await Users.findOne({username}).exec();
    
        if(!findUserbyUsername ) {
            console.log('nu am user in db',username);
            return res.status(200).json({message : `No data found for username ${username}`, statusCode : 204});
        }

        // aici am user
        if(email) {
            // check if its the exact email;
            if(email === findUserbyUsername.email) {
                console.log('AVEM ACELASI EMAIL', email,findUserbyUsername.email);
                // este acelasi email => nu updatam email;
                fullName ? findUserbyUsername.fullName = fullName : null;
                favoriteDriver ? findUserbyUsername.favoriteDriver = favoriteDriver : null;
                favoriteConstructor ? findUserbyUsername.favoriteConstructor = favoriteConstructor : null;
                await findUserbyUsername.save();
                return res.status(200).json({message : `User informations for username ${username} updated successfully`, statusCode : 200});
            }

            // check if this email is already taken;
            const emailTaken = await Users.findOne({email}).exec();
            if(emailTaken) {
                return res.status(400).json({message : `Email ${email} is already taken`,statusCode : 400});
            } else {
                console.log('nu avem acelasi email', email, findUserbyUsername.email);
                // email not taken, can update the user info
                findUserbyUsername.email = email;
                fullName ? findUserbyUsername.fullName = fullName : null;
                favoriteDriver ? findUserbyUsername.favoriteDriver = favoriteDriver : null;
                favoriteConstructor ? findUserbyUsername.favoriteConstructor = favoriteConstructor : null;

                await findUserbyUsername.save();
                return res.status(200).json({message : `User informations for username ${username} updated successfully`, statusCode : 200});
            }
        }
    } catch (error) {
        return res.status(500).json({message : `Unexpected error occured ${error}`, statusCode : 500});
    } 

}

module.exports = updateUserInfo;