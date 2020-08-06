const express = require('express');
const commentsControllers = require('../controllers/comments.controllers');
const router = express.Router();

router.post('/new', commentsControllers.addComment);
router.get('/all', commentsControllers.getAllComments);
router.get('/:commentId', commentsControllers.getCommentByID);
router.get('/category/:category', commentsControllers.getCommentsByCategory);
router.put('/:commentId', commentsControllers.updateComment);
router.delete('/:commentId', commentsControllers.deleteComment)

module.exports = router;
