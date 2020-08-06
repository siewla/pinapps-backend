const Comments = require('../models/comments');
const Apps = require('../models/apps');
const Users = require('../models/user')

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
}
