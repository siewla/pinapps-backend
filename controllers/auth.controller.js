const User                  =   require('../models/auth.model');
const expressJWT            =   require('express-jwt');
const _                     =   require('lodash');
const { OAuth2Client }      =   require('google-auth-library');
const fetch                 =   require('node-fetch');
const { validationResult }  =   require('express-validator');
const jwt                   =   require('jsonwebtoken');
//custom error handler to get useful error from database errors
const { errorHandler }      =   require('../helpers/dbErrorHandling');
const sendgrid              =   require('@sendgrid/mail');

sendgrid.setApiKey(process.env.MAIL_KEY);

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
                    error: 'This email is registered before'
                });
            }
        });

        //generate token
        const token = jwt.sign(
            {
                name,
                email,
                password
            },
            process.env.JWT_ACCOUNT_ACTIVATION,
            {
                expiresIn: '5m'
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

        sendgrid.send(emailData).then(() => {
            // console.log('email sent');
            return res.json({
                message: `Email has been sent to ${email}`
            });
        }).catch (error => {
            // console.log(error.toString());
            return res.status (400).json({
                error:errorHandler(error)
            });
        });
    }
};

//Activation and save to database 
exports.activationController = (req, res) =>{
    const { token } = req.body;

    if (token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err) => {
            if (err) {
                console.log('Activation error');
                return res.status(401).json({
                    errors: 'Expired link. Signup again'
                });
            } else {
                const { name, email, password } = jwt.decode(token);
    
                // console.log(email);
                const user = new User({
                    name,
                    email,
                    password
                });
    
                user.save((err) => {
                    if (err) {
                        console.log('Save error', errorHandler(err));
                        return res.status(401).json({
                            errors: errorHandler(err)
                        });
                    } else {
                        return res.json({
                            success: true,
                            message: 'Signup success'
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
