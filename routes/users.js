const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../models/User');


// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', [
    check('username', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password should be longer than 6 characters').isLength({ min: 6 })
], async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;

    try {

        let user = await User.findOne({ email }).lean();

        if (user) return res.status(404).json({ msg: "User already exists" });

        user = new User({
            username,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 86400
        },
            (err, token) => {
                if (err) throw err;
                res.json({ token })
            })

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }

})

module.exports = router;