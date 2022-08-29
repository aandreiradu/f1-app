const jwt = require('jsonwebtoken');

const verifyJWT = (req,res,next) => {
    console.log('start verify JWT');

    const authHeader = req.headers.authorization || req.headers.Authorization;

    if(!authHeader) {
        console.log('nu are bearer in header');
        return res.status(401).json({message : 'Unauthorized'});
    }

    const token = authHeader.split(' ')[1]; 
    console.log('token header',token);

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded) => {
            console.log('err',err);
            console.log('decoded',decoded);

            if(err) {
                console.log('error on verifying the access token => return 403');
                return res.status(403).json({message : 'Forbidden'});
            }

            req.user = decoded?.F1_APP_USER?.fullName,
            req.roles = decoded?.F1_APP_USER?.roles
            next();
        }
    );

    console.log('stop verify JWT');
}

module.exports = verifyJWT;