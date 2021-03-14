const express = require('express');
const router = express.Router();

// @route   GET api/conatcts
// @desc    Get all users contacts
// @access  Private

router.get('/', (req, res) => {
    res.send('Get all contacts')
});

// @route   POST api/conatcts
// @desc    Add new contact
// @access  Private

router.post('/', (req, res) => {
    res.send('Add contact')
});

// @route   PUT api/conatcts/:id
// @desc    Update contact
// @access  Private

router.put('/:id', (req, res) => {
    res.send('Update contact')
});

// @route   DELETE api/conatcts/:id
// @desc    Delete contact
// @access  Private

router.delete('/:id', (req, res) => {
    res.send('Delete contact')
});

module.exports = router;