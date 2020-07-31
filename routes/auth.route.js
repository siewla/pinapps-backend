const express   =   require('express');
const router    =   express.Router();

//Load Controllers
const { 
    registerController, 
    activationController, 
    loginController, 
    forgetController,
    resetController,
    googleController } = require('../controllers/auth.controller.js');

router.post('/register', registerController);
router.post('/activation', activationController);
router.post('/login', loginController);
router.put('/password/forget', forgetController);
router.put('/password/reset', resetController);
router.post('/googlelogin', googleController);


module.exports = router;