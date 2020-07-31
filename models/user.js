const mongoose = require('mongoose');
// const crypto = require('crypto');
const bcrypt = require('bcrypt');
const SALT_ROUND = process.env.SALT_ROUND;
// user schema
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true
        },
        name: {
            type: String,
            trim: true,
            required: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: 'user'
        },
        resetPasswordLink: {
            data: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

// virtual
userSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.hashed_password = bcrypt.hashSync(this._password, bcrypt.genSaltSync(SALT_ROUND));
    })
    .get(function () {
        return this._password;
    });

module.exports = mongoose.model('User', userSchema);