const express = require('express');
const router = express.Router();
router.use('/auth', require('./auth.routes'));
router.use('/apps', require('./apps.routes'));
router.use('/users', require('./users.routes'));
router.use('/categories', require('./categories.routes'))
router.use('/comments', require('./comments.routes'))
module.exports = router;
