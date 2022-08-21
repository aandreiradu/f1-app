const Users = require('../model/Users');
const JSONWEBTOKEN = require('jsonwebtoken');

const handleRefreshToken = async (req,res) => {
    console.log('START REFRESH TOKEN');
    const {jwt} = req.cookies;

    console.log('jwt cookie',jwt);

    if(!jwt) {
        console.log('nu are jwt pe cookie, return 401');
        return res.status(401).json({message: 'Unauthorized', statusCode : 401});
    }

    const refreshToken = jwt; 
    const findUser = await Users.findOne({refreshToken}).exec();

    if(!findUser) {
        return res.status(403).json({message : 'Forbidden',statusCode : 403});
    }

    JSONWEBTOKEN.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,decode) => {
        console.log('verify jwt err ',err);
        console.log('verify jwt decode',decode);
        if(err || findUser.username !== decode.username) {
            // jwt expired or username not decoded; => clear the cookie and redirect to login;
            return res
              .status(403)
              .clearCookie("jwt", {
                httpOnly: true,
                secure: true, 
                maxAge: 24 * 60 * 60 * 1000,
              })
              .json({ message: "Forbidden", statusCode: 403 });   
        }

        const generateNewAccessToken = JSONWEBTOKEN.sign(
            {
                F1_APP_USER: {
                  username: findUser.username,
                  email: findUser.email,
                  fullName: findUser.fullName,
                },
              },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "15m" }
        );

        console.log('generateNewAccessToken',generateNewAccessToken);

        return res.status(201).json({accessToken : generateNewAccessToken});
    });
    
    console.log('STOP REFRESH TOKEN');
}

module.exports = { handleRefreshToken };