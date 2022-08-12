const allowedOrigins = require('./allowedOrigins');


// configure cors options, so the app accepts requests only from whitelisted adressess.

const corsOptions = {
    origin : (origin,callback) => {
        console.log('origin',origin);
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null,true);
        } else {
            callback( new Error('Not allowed by cors'));
        }
    },
    optionSuccessStatus: 200,
    credentials: true
}

module.exports = corsOptions;