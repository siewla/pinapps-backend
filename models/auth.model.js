const mongoose  =   require('mongoose');
const Schema    =   mongoose.Schema;
const crypto    =   require('crypto');

const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase:true
    },
    name: {
        type: String,
        trim:true,
        required: true
    },
    hashed_password: {
        type: String,
        trim:true,
        required: true
    },
    salt: String,
    role:{
        type: String,
        default: 'Normal'
    },
    resetPasswordLink:{
        data: String,
        default:''
    }
}, { timestamps: true });

//Virtual Password
UserSchema.virtual('password')
    .set(function (password){
        this.password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function (){
        return this._password;
    });

//Methods
UserSchema.methods = {
    //Generate Salt
    makeSalt: function () {
        return Math.round(new Date().valueOf()*Math.random())+'';
    },

    //Encrypt Password
    encryptPassword: function (password){
        if(!password) return '';
        try{
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err){
            return '';
        }
    },

    //compare password between plain get from user and hashed
    authenticate: function (plainPassword){
        return this.encryptPassword(plainPassword===this.hashed_password);
    }


};

const User = mongoose.model('User', UserSchema);
module.exports = User;