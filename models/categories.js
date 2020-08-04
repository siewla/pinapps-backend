const mongoose = require('mongoose')

// Apps Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    value: {
        type: String,
        default: function () {
            return this.name.toLowerCase().replace(/\s/g, '-');
        }
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Categories', categorySchema);
