const User                  =   require('../models/user');
const { OAuth2Client }      =   require('google-auth-library');
const _                     =   require('lodash');
const { validationResult }  =   require('express-validator');
const jwt                   =   require('jsonwebtoken');
const nodemailer            =   require('nodemailer');
const bcrypt                =   require('bcrypt');
const SALT_ROUND            =   10;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USERNAME, // generated ethereal user
        pass: process.env.GMAIL_PASSWORD, // generated ethereal password
    },
});

exports.registerController = (req, res)=>{
    const { name, email, password } = req.body;
    const errors = validationResult (req);
    
    if (!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            error: firstError
        });
    } else {
        User.findOne({
            email
        }).exec((err, user) =>{
            if (user){
                return res.status(400).json({
                    message: 'This email is registered before'
                });
            }
        });

        const hashed_password=bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_ROUND));

        //generate token
        const token = jwt.sign(
            {
                name,
                email,
                password: hashed_password
            },
            process.env.JWT_ACCOUNT_ACTIVATION,
            {
                expiresIn: '15m'
            }
        );

        // console.log(token);

        //Email Data Sending
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: 'PinApps Account Activation Link',
            html: `
                <h1>Please click the link to activate</h1>
                <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                <hr/>
                <p>This email contains sensitive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
        };

        // console.log(emailData);
        transporter.sendMail(emailData, function (err){
            if (err){
                return res.status (400).json({
                    message:'Internal email error'
                });
            } else {
                return res.json({
                    message: `Email has been sent to ${email}`
                });
            }
        }); 
    }
};

//Activation and save to database 
exports.activationController = (req, res) =>{
    const { token } = req.body;

    if (token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err) => {
            if (err) {
                return res.status(401).json({
                    message: 'Expired link. Signup again'
                });
            } else {
                const { name, email, password } = jwt.decode(token);
    
                // console.log(email);
                const user = new User({
                    name,
                    email,
                    password
                });

                User.create(user, (err, createUser) =>{
                    if (err) {
                        return res.status(401).json({
                            message: 'User existed'
                        });
                    } else {
                        return res.json({
                            success: true,
                            message: `${createUser.name} is successfully activated`
                        });
                    }
                });
            }
        });
    } else {
        return res.json({
            message: 'error happening please try again'
        });
    }
};

exports.loginController = (req, res) =>{
    const { email } = req.body; 
    // console.log(password);
    const errors = validationResult (req);
    
    if (!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            error: firstError
        });
    } else {
        //check if user exist
        User.findOne({
            email
        }).exec((err, user)=>{
            if(err||!user){
                return res.status(400).json({
                    error: 'User doesn\'t exist, please sign up.'
                });
            } else {
                if(!bcrypt.compareSync(req.body.password, user.password)){
                    return res.status(400).json({
                        error: 'Email and password do not match'
                    });
                }
            }

            //generate token
            const token = jwt.sign(
                { _id:user._id }
                , process.env.JWT_SECRET,
                {
                    expiresIn: '7d'
                }
            );

            const { _id, name, email, role } = user;
            
            return res.json({
                token,
                user:{
                    _id,
                    name,
                    email,
                    role
                }
            });

        });
    }
};

exports.forgetController = (req, res) =>{
    const { email } = req.body; 
    // console.log(password);
    const errors = validationResult (req);
    
    if (!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            error: firstError
        });
    } 

    User.findOne({
        email
    }).exec((err, user)=>{
        if(err||!user){
            return res.status(400).json({
                error: 'User doesn\'t exist, please sign up.'
            });
        } else {
            //generate token for user to reset password
            const token = jwt.sign({
                _id: user._id
            }, process.env.JWT_RESET_PASSWORD, {
                expiresIn: '15m'
            });

            //Email Data Sending
            const emailData = {
                from: process.env.EMAIL_FROM,
                to: process.env.EMAIL_TO,
                subject: 'PinApps Account Reset Password Link',
                html: `
                <h1>Please click the link to reset your password</h1>
                <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
                <hr/>
                <p>This email contains sensitive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
            };
            
            user.updateOne({
                resetPasswordLink: token
            }, (err) =>{
                if (err){
                    return res.status(400).json({
                        error: 'Internal Database error'
                    });
                } else {
                    transporter.sendMail(emailData, function (err){
                        if (err){
                            return res.status (400).json({
                                message:'Internal email error'
                            });
                        } else {
                            return res.json({
                                message: `Email has been sent to ${email}`
                            });
                        }
                    }); 
                }
            });
        }
    });
    

};

exports.resetController = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body; 
    const errors = validationResult (req);
    
    if (!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            error: firstError
        });
    } else {
        if (resetPasswordLink){
            jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function (err){
                if (err){
                    return res.status(400).json({
                        message: err.message
                    });
                }

                User.findOne( { resetPasswordLink }, (err, user) =>{
                    if(err || !user){
                        return res.status(400).json({
                            error: 'Something Went Wrong, please try later.'
                        });
                    }

                    const updatedFields = {
                        password : bcrypt.hashSync(newPassword, bcrypt.genSaltSync(SALT_ROUND)),
                        resetPasswordLink: ''
                    };

                    user = _.extend(user, updatedFields);
                    
                    user.save((err)=>{
                        if (err){
                            return res.status(400).json({
                                error: 'There is an error resetting the password'
                            });
                        } 

                        res.json({
                            message:'You can now login with your new password'
                        });

                    });
                });
            });
        }
    }

};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);

exports.googleController = (req, res) => {
    const { idToken } = req.body;
  
    client
        .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
        .then(response => {
        // console.log('GOOGLE LOGIN RESPONSE',response)
            const { email_verified, name, email } = response.payload;
            if (email_verified) {
                User.findOne({ email }).exec((err, user) => {
                    if (user) {
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                            expiresIn: '7d'
                        });
                        const { _id, email, name, role } = user;
                        return res.json({
                            token,
                            user: { _id, email, name, role }
                        });
                    } else {
                        let password = email + process.env.JWT_SECRET;
                        user = new User({ name, email, password });
                        user.save((err, data) => {
                            if (err) {
                                console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                                return res.status(400).json({
                                    error: 'User signup failed with google'
                                });
                            }
                            const token = jwt.sign(
                                { _id: data._id },
                                process.env.JWT_SECRET,
                                { expiresIn: '7d' }
                            );
                            const { _id, email, name, role } = data;
                            return res.json({
                                token,
                                user: { _id, email, name, role }
                            });
                        });
                    }
                });
            } else {
                return res.status(400).json({
                    error: 'Google login failed. Try again'
                });
            }
        });
}; 