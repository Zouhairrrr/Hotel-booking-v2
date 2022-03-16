const express = require('express');
const Router = express.Router();
const middleware = require('../middlewares/auth');
const authController = require('../controllers/auth.controller')

//? const RouteGroup = require('express-route-grouping')

Router.post('/auth/register',
    [
        //! valudate user informations before creating
        middleware.CheckDuplicateUser,
        middleware.CheckDuplicateEmail,
        middleware.ValidatePassword
    ],
    //* create new User instance
    authController.CreateNewUser
);

Router.post('/auth/login', middleware.ValidatePassword, authController.Authenticate);



module.exports = Router;