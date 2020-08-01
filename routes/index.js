const express = require('express');
const router = express.Router();
router.use('/auth', require('./auth.routes'));
router.use('/apps', require('./apps.routes'));
router.use('/users', require('./users.routes'));
module.exports = router;
