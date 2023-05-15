const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    pageContent: {
        type: String,
        required: true,
    },
    pageNumber: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;

