const express = require('express');
const appsControllers = require('../controllers/apps.controllers');
const router = express.Router();

router.post('/new', appsControllers.addApp);
router.get('/all', appsControllers.getAllApps);
router.get('/:appId', appsControllers.getAppByID);
router.get('/category/:category', appsControllers.getAppsByCategory);
router.put('/:appId', appsControllers.updateApp);
router.delete('/:appId', appsControllers.deleteApp)
router.patch('/like/:appId', appsControllers.likeApp)
router.patch('/unlike/:appId', appsControllers.unlikeApp)

module.exports = router;
