const Comments = require('../models/comments');
const Apps = require('../models/apps');
const Users = require('../models/user')
const ObjectId = require('mongoose').Types.ObjectId

/**
 * Requires a payload in the request body of: {
 *      author: user._id
 *      app: app._id
 *      comment: the comment
 *      
 * }
 * @param {*} req 
 * @param {*} res 
 */
exports.addComment = (req, res) => {
    const comment = req.body;
    console.log('comment:', comment)
    Comments.create(comment).then(result => {
            const commentId = result.id;
            Apps.findByIdAndUpdate(comment.app, {
                $push: {
                    comments: commentId
                }
            });
            Users.findByIdAndUpdate(comment.author, {
                $push: {
                    comments: commentId
                }
            })
        })
        .then(result => {
            console.log(result);
            res.json(result)
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
}

exports.getCommentByID = (req, res) => {
    Comments.findById(req.params.commentId).then(comment => {
        res.json(comment)
    }).catch(err => {
        console.log(err);
        res.json(err)
    })
}

exports.getAllCommentsByAppId = (req, res) => {
    Comments.find({
        app: ObjectId(req.params.appId)
    }).limit(100).then(comments => {
        console.log('get all comments:', comments)
        res.json(comments)
    }).catch(err => {
        console.log(err);
        res.json(err)
    })
}

exports.getAllCommentsByUserId = (req, res) => {
    Comments.find({
        app: ObjectId(req.params.userId)
    }).limit(100).then(comments => {
        console.log('get all comments:', comments)
        res.json(comments)
    }).catch(err => {
        console.log(err);
        res.json(err)
    })
}

exports.updateComment = (req, res) => {
    const comment = req.params.commentId
    Comments.findByIdAndUpdate(comment, req.body)
        .then(result => res.json(result.result))
        .catch(err => res.json(err))
}

exports.deleteComment = (req, res) => {
    const comment = req.params.commentId
    Comments.findByIdAndDelete(comment)
        .then(result => res.json(result.result))
        .catch(err => res.json(err))
}
