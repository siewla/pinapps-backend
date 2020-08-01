const mongoose = require('mongoose')

// Apps Schema
const categorySchema = new mongoose.Schema({
    categories: Array
}, {
    timestamps: true
})

module.exports = mongoose.model('Categories', categorySchema);
