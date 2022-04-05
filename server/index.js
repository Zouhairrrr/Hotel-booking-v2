const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");
const session = require('express-session')
const cookieParser = require('cookie-parser');
require('dotenv').config()
const authRoute = require('./router/auth.routes')

const PORT = process.env.PORT || 8082;
const app = express();


const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

const corsOptions = {
    origin: 'http://localhost:9002',
    optionsSuccessStatus: 200,
    withCredentials: true
};
app.use(cors({ origin: corsOptions }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// * General route
app.use('/', authRoute);

//! conncection to database : 
mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
