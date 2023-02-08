const mongoose = require('mongoose');

const User = mongoose.Schema({
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    type: {
        type: String,
        // required: true,
        enum: ['student', 'teacher', 'employer']
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', User);