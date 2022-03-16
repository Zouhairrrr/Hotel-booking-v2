const express = require('express');
const authRouter = express.Router();
const middleware = require('../middlewares/auth');
const authController = require('../controllers/auth.controller')
const service = require('../controllers/services/validate')

//? const RouteGroup = require('express-route-grouping')

authRouter.post('/auth/register',
    [
        //! valudate user informations before creating
        middleware.validateForm,
        middleware.CheckDuplicateUser,
        middleware.CheckDuplicateEmail,
        middleware.ValidatePassword
    ],
    //* create new User instance
    authController.CreateNewUser
);


authRouter.post('/auth/login',
    [
        middleware.validateFormLogin,
        middleware.ValidateEmailLogin,
        middleware.ValidatePasswordLogin,
    ],
    authController.Authenticate);


// ?  routes for resetPassword

authRouter.post('/auth/forgotPassword', authController.ForgotPassword);

authRouter.get('/auth/resetPassword/:id/:token', authController.ResetPassword);
authRouter.post('/auth/resetPassword/:id/:token', authController.ActivatePassword);

// authRouter.post('/auth/reset-password', authController.ActivateAcount);


module.exports = authRouter;