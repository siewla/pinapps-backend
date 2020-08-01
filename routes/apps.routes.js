const express = require('express');
const appsControllers = require('../controllers/apps.controllers')
const router = express.Router();

router.post('/new', appsControllers.addApp);
router.get('/screenshot/:id', appsControllers.getAppScreenshot)

module.exports = router;
