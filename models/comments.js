const mongoose = require('mongoose')

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
    }
}, {
    timestamps: true,
})
