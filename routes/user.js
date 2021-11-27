const express = require('express');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const router = express.Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');

//update user
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_KEY).toString();
    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updateUser)
    } catch (err) {
        res.status(500).json(err)
    }
});

//delete user
router.delete('/:id', verifyTokenAndAdmin, async (req, res) =>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted')
    } catch (err) {
        res.status(500).json(err)
    }
})

//get user by id
router.get('/:id', verifyTokenAndAdmin, async (req, res) =>{
    try {
      const user = await User.findById(req.params.id)
      !user && res.status(400).json('User Not found')
      const { password, ...others } = user._doc;
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})

//get all user
router.get('/', verifyTokenAndAdmin, async (req, res) =>{
    try {
      const users = await User.find();
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router;