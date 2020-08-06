const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    app: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Comments', commentsSchema);
