const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const router = express.Router();

const User = require('../models/User');
const { check, validationResult } = require('express-validator');


// @route   GET api/users
// @desc    Get logged in user
// @access  Private

router.get('/', auth, async (req, res) => {
    try {

        const user = await User.findById(req.user.id, { password: 0 });
        res.json(user);
    } catch (error) {
        console.error(error.msg);
        res.status(500).send('Server Error');
    }
});


// @route   POST api/users
// @desc    Auth user & get token
// @access  Public

router.post('/', [
    check('email', 'Please enter an email').isEmail(),
    check('password', 'Please enter your password').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ erros: errors.array() });

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email }).lean();

        if (!user) return res.status(401).json({ msg: "Email and password doesn't match!" });


        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ msg: "Email and password doesn't match!" });

        const payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 86400
        },
            (err, token) => {
                if (err) throw err
                else res.json({ token });
            });

    } catch (error) {
        console.error(error.msg);
        res.status(500).json({ msg: "Server Error" });
    }

});

module.exports = router;