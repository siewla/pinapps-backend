const express = require('express');
const commentsControllers = require('../controllers/comments.controllers');
const router = express.Router();

router.post('/new', commentsControllers.addComment);
router.get('/app/:appId', commentsControllers.getAllCommentsByAppId);
router.get('/author/:authorId', commentsControllers.getAllCommentsByUserId);
router.get('/search', commentsControllers.searchCommentByKeyword)
router.get('/:commentId', commentsControllers.getCommentByID);
router.put('/:commentId', commentsControllers.updateComment);
router.delete('/:commentId', commentsControllers.deleteComment)

module.exports = router;
