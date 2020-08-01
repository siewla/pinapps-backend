const express = require('express');
const appsControllers = require('../controllers/apps.controllers');
const router = express.Router();

router.post('/new', appsControllers.addApp);
router.get('/all', appsControllers.getAllApps);
router.get('/:id', appsControllers.getAppByID);
router.get('/category/:category', appsControllers.getAppsByCategory)


module.exports = router;
