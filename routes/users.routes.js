const express   =   require('express');
const router    =   express.Router();

//Load Controllers
const { 
    getAllUsers,
    getUserByEmail } = require('../controllers/users.controller.js');

router.get('/all', getAllUsers);
router.get('/email/', getUserByEmail);

module.exports = router;