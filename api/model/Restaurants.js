const mongoose = require('mongoose');

const Restaurant = new mongoose.Schema({
    title: {
        type: String,
    },
    image_url: {
        type: String,
    }, review_count: {
        type: Number,
    }, categories: {
        type: Array,
    }, rating: {
        type: String,
    }, price: {
        type: String,
    }, location: {
        type: String,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Restaurants", Restaurant)