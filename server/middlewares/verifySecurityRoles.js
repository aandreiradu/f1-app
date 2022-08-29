const Users = require('../model/Users');
const jwt = require('jsonwebtoken');

const verifySecurityRoles = (...allowedRoles) => {
    return async (req,res,next) => {
        console.log('MIDDLEWARE ROLES RECEIVED', req?.roles, req?.year,req?.roundNo);
        const authToken = (req?.headers?.Authorization || req?.headers?.authorization)?.split(' ')[1];
        console.log('verifySecurityRoles authToken', authToken);
        
        let username;
        if(authToken) {
            jwt.verify(
                authToken,
                process.env.ACCESS_TOKEN_SECRET,
                (err,decoded) => {
                    console.log('err jwt verifySecurityRoles', err);
                    console.log('decoded jwt verifySecurityRoles', decoded);
                    
                    if(err) {
                        console.log('cant identify the user by the authToken', authToken);
                    } 

                    if(decoded) {
                        username = decoded?.F1_APP_USER?.username;
                    }
                }
            )
        }

        if(!req?.roles) {
            console.log('NU ARE REQ.ROLES!!!');
            return res
              .status(401)
              .clearCookie("jwt", {
                httpOnly: true,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
              })
              .json({ message: "Unauthorized", statusCode: 401, details: `User with username ${username} can't access this route!` });
        }

        const rolesArray = [...allowedRoles];
        console.log('rolesArray',rolesArray);
        console.log('req.roles',req.roles);
        const result = req?.roles?.map(role => rolesArray?.includes(role))?.find(val => val === true);
        
        if(!result) 
            return res
              .status(401)
              .clearCookie("jwt", {
                httpOnly: true,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
              })
              .json({ message: "Unauthorized", statusCode: 401, details: `User with username ${username} can't access this route!` });

        next();
    }
};


module.exports = verifySecurityRoles;