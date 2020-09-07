const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    id: String,
    name: String,
    description: String,
    imageUrl: String,
    price: Number,
    profit: String,
    isDeleted: Number,
    category: [{
        type: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);