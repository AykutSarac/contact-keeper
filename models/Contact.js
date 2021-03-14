const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
    },
    type: {
        type: String,
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, {
  versionKey: false  
});

module.exports = mongoose.model('contact', UserSchema);