const mongoose = require('mongoose');

const Orders = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurants'
    }, menu_items: {
        type: Array,
    }, price: {
        type: String,
    }, status: {
        type: Boolean,
        default: false,
    }, txn_id: {
        type: String,
    }, response: {
        type: Array,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Orders", Orders)