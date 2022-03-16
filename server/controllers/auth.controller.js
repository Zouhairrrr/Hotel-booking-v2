const userModel = require('../models/userModel')

const tokenModel = require('../models/tokenModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv');
dotenv.config()
const sendEmail = require('./services/mail')

//  * create new user with a client default as role 

const CreateNewUser = async (req, res) => {
    const data = req.body;
    //* now we set user password to hashed password
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    await userModel.create(data, (err, response) => {
        if (err) {
            console.log('ERR => ' + err);
            return res.status(400).json(err);
        } else {
            return res.status(200).json({ success: true, message: 'created successfully ^_^', data: response });
        }
    })
}

const Authenticate = async (req, res) => {

    try {
        const bodyData = req.body;
        const user = await userModel.findOne({ email: bodyData.email })
        if (!user) return res.status(500).json({ success: false, message: "user dosent exist" })
        const isValid = bcrypt.compareSync(bodyData.password, user.password)
        if (isValid) {
            const token = jwt.sign(
                {
                    id: user._id,
                    name: user.name
                },
                process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2000' }
            )
            return res.status(200).json({ success: true, message: "Login succeeded", data: { token } });
        } else {
            return res.status(401).json({
                success: false,
                message: "Password dosen't match",
            })
        }
    } catch (error) {
        console.log('ERROR => ' + error);
        return res.status(500).json(error);
    }
};



const ForgotPassword = async (req, res) => {

    const email = req.body.email;
    const subject = "Reset Password"
    // * get user email 
    const user = await userModel.findOne({ email: email })
    if (!user) return res.status(401).json({ success: false, message: "user does not exist" })
    const secret = process.env.ACCESS_TOKEN_SECRET;
    let payload = {
        id: user._id,
        email: user.email,
    };
    const token = jwt.sign(payload, secret, { expiresIn: '20m' })
    const link = `http://localhost:9002/auth/resetPassword/${user.id}/${token}`;
    // console.log(link);
    const text = `<p>This link is valide one time only <a href ="${link}">Reset your Password</a></p>`;
    const data = await sendEmail(email, subject, text);
    if (data) return res.status(200).json({ success: true, message: 'email sent successfully check your email address' })

}





const ResetPassword = (req, res) => {
    
    // const token = req.headers["authorization"].split(" ")[2]
    // const id = req.headers["authorization"].split(" ")[1]
    // console.log(id);
    const { id, token } = req.params
    console.log(req.params);
    if (!token)console.log("eeeee") 
    // return res.status(400).json({ success: false, message: "invalid link or expired" });
    // const secret = process.env.ACCESS_TOKEN_SECRET ;
    // try {
    //     const paylod = jwt.verify(token, secret)

    // } catch (error) {
    //     console.log(error.message);
    //     res.status(401).json({ success: false, message: "invialide token"});
    // }


    // const decoded = jwt.verify(token, secret, (err, res) => {
    //     if (err) {
    //         console.log(err);
    //     }
    // });

    // console.log(secret);
    // if (token) {
    //     jwt.verify(resetLink, process.env.ACCESS_TOKEN_SECRET)
    // }
    // User.findOne({ email: email }, (err, user) => {
    //     if (err || !user) {
    //         return res.status(401).json({ success: false, message: "email wrong" });
    //     }
    // });

}

const ActivatePassword = async (req, res, next) => {
    const { id, token } = req.params

    // const { token } = req.params
    // console.log(req.params)
    // if (!token) return res.status(400).json({ success: false, message: "invalid link or expired" });
    // const secret = process.env.ACCESS_TOKEN_SECRET;
    // try {
    //     const data = jwt.verify(token, secret)
    //     if (data) return res.stauts(200).json({ success: true, message: "adadadada" })
    // } catch (error) {
    //     console.log(error.message);
    //     res.status(401).json({ success: false, message: "invialide token" });
    // }
}


module.exports = { CreateNewUser, Authenticate, ForgotPassword, ResetPassword, ActivatePassword };