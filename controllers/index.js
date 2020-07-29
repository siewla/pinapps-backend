const express   =   require('express');
const router    =   express.Router();
const User      =   require('../models/User');

router.get('/', (req,res) =>{
    res.send('Hi from PinApps backend');
});

router.get('/users', (req,res)=>{
    User.find({}, (err, allUsers) =>{
        res.json(allUsers);
    });
});

router.post('/users', (req,res)=>{
    User.create(req.body, (err, createUser) =>{
        res.json(createUser);
    });
});

module.exports = router;