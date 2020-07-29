const express   =   require('express');
const router    =   express.Router();

//Load Controllers
const { registerController, activationController } = require('../controllers/auth.controller.js');

router.post('/register', registerController);
router.post('/activation', activationController);


module.exports = router;