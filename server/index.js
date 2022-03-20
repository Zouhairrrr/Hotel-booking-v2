const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");
const session = require('cookie-session')
const dotenv = require('dotenv');
const authRoute = require('./router/auth.routes')
const PORT = process.env.PORT || 8082;
const app = express();
dotenv.config()



const expiryDate = new Date(Date.now() + 60 * 60 * 1000) //! 1 hour
app.use(session({
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {
        name: 'session',
        keys: 'secret key',
        maxAge: 24 * 60 * 60 * 1000 //24H
    }
}))

const corsOptions = {
    origin: 'http://localhost:9002',
    optionsSuccessStatus: 200,
    withCredentials: true
};
app.use(cors({ origin: corsOptions }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



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
