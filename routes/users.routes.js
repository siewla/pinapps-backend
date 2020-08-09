const express = require('express');
const router = express.Router();

//Load Controllers
const {
    getAllUsers,
    getUserByEmail,
    getUserByID,
    getLikedApps
} = require('../controllers/users.controller.js');

router.get('/all', getAllUsers);
router.get('/email/', getUserByEmail);
router.get('/user/:id', getUserByID);
router.get('/liked-apps/:userId', getLikedApps)

module.exports = router;
