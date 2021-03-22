const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Contact = require('../models/Contact');
const { check, validationResult } = require('express-validator');


// @route   GET api/conatcts
// @desc    Get all users contacts
// @access  Private

router.get('/', auth, async (req, res) => {

try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    res.json(contacts);
} catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
}

});

// @route   POST api/conatcts
// @desc    Add new contact
// @access  Private

router.post('/', auth, [
    check('username', 'Name field cannot be empty').notEmpty(),

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, email, phone, type } = req.body;

    try {
        const newContact = new Contact({
            username,
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();

        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/conatcts/:id
// @desc    Update contact
// @access  Private

router.put('/:id', auth, async (req, res) => {

    const { username, email, phone, type } = req.body;

    const contactFields = {};
    if (username) contactFields.username = username;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;


    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        // Check if user owns contact
        if (contact.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });
        res.json(contact);
        

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route   DELETE api/conatcts/:id
// @desc    Delete contact
// @access  Private

router.delete('/:id', auth, async (req, res) => {

    try {

        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        // Check if user owns contact
        if (contact.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        await Contact.findByIdAndRemove(req.params.id);
        res.json({ msg: "Contact removed successfully!"});
        

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;