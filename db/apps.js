const mongoose = require('mongoose')

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
    description: String,
    category: {
        type: String,
        required: true
    },
    comments: Array
})
