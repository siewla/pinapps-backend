const express = require('express');
const categoryControllers = require('../controllers/categories.controllers');
const router = express.Router();

router.post('/new', categoryControllers.addCategory);
router.get('/all', categoryControllers.getAllCategories);
router.get('/:id', categoryControllers.getCategoryByID);

module.exports = router;
