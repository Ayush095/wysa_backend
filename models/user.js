const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    sleepProblem: {
        type: String
    },
    bedTime: {
        type: String,
    },
    getUpTime: {
        type: String
    }
}, {
    timestamps: true,
});

// timestamps is used for when were the last time user updated.

const User = mongoose.model('User', userSchema);

module.exports = User;