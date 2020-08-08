const express = require('express');
const commentsControllers = require('../controllers/comments.controllers');
const router = express.Router();

router.post('/new', commentsControllers.addComment);
router.get('/all/:appId', commentsControllers.getAllCommentsByAppId);
router.get('/:commentId', commentsControllers.getCommentByID);
router.put('/:commentId', commentsControllers.updateComment);
router.delete('/:commentId', commentsControllers.deleteComment)

module.exports = router;
