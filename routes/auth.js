const express = require('express');
const router = express.Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//register
router.post('/register', async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        //password changed to hash
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_KEY).toString()
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

//login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json('User Not Found !! Please Register')

        //decrypt the hashedpassword
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_KEY);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        originalPassword !== req.body.password && res.status(401).json('Password did not match !!!')

        //jwt token
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        },
            process.env.JWT_KEY,
            { expiresIn: "1d" }
        );

        //destructure our user...we pass only response without password
        const { password, ...userData } = user._doc;
        res.status(200).json({userData, accessToken});  //it send details of user except password and pass token

    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router;