const mongoose = require('mongoose')

// Apps Schema
const appsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    screenshot: Buffer,
    description: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        required: true
    },
    comments: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Apps', appsSchema);
