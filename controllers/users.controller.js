const User = require('../models/user');
const Apps = require('../models/apps')

exports.getAllUsers = (req, res) => {
    User.find({}, (err, foundUsers) => {
        res.json(foundUsers);
    });
};

exports.getUserByEmail = (req, res) => {
    const {
        email
    } = req.body;
    User.findOne({
        email
    }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User doesn\'t exist, please sign up.'
            });
        } else {
            res.json(user);
        }
    });
};

exports.getUserByID = (req, res) => {
    User.findById(req.params.id).then(user => {
        res.json(user);
    });
};

exports.getLikedApps = (req, res) => {
    Apps.find({
        likes: req.params.userId
    }).then(app => res.json(app))
}
