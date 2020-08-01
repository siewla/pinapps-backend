const express   =   require('express');
const router    =   express.Router();

//Load Controllers
const { 
    getAllUsers,
    getUserByEmail,
    getUserByID } = require('../controllers/users.controller.js');

router.get('/all', getAllUsers);
router.get('/email/', getUserByEmail);
router.get('/user/:id', getUserByID);

module.exports = router;