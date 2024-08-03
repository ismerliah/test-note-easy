const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    notes: {
        type: Array,
        default: []
    }
})

const CategoryModel = mongoose.model('categories', CategorySchema)
module.exports = CategoryModel