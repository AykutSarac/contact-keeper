const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, {
  versionKey: false  
});

module.exports = mongoose.model('user', UserSchema);