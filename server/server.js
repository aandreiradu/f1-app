require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middlewares/credentials');
const connectDB = require('./config/dbConnection');
const verifyJWT = require('./middlewares/verifyJWT');
const bodyParser = require('body-parser');

connectDB();

// handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// cross origin resource sharing
app.use(cors({corsOptions,credentials : true,origin: true}));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// built-in middleware to handle urlencoded data ('content-type : application/x-www-form-urlencoded);
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended : false}));


// middleware for cookies
app.use(cookieParser());


// built-in middleware for static  files
app.use(express.static(path.join(__dirname, "../public")));

// routes
app.use('/',require('./routes/root'));
app.use('/register',require('./routes/register/register'));
app.use('/login',require('./routes/auth/auth'));
app.use('/refresh',require('./routes/refresh/refresh'));
app.use('/logout',require('./routes/logout/logout'));


app.use(verifyJWT);
app.use('/api/addRaceResult',require('./routes/api/addRaceResult'));
app.use('/api/getRaceResultByYear',require('./routes/api/getRaceResultByYear'));
app.use('/api/accounts/updateProfilePicture',require('./routes/api/updateUserInfo'));
app.use('/api/accounts/edit',require('./routes/api/getUserInformations'));


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.json({'message' : '404 Not Found', statusCode : 404}).sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});


mongoose.connection.once("open", () => {
    console.log('Connected to MongoDb');
    app.listen(process.env.PORT,() => {
        console.log(`server running on port ${process.env.PORT}`);
    })
})