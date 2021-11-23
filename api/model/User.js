const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cust_id: { type: String, default: null },
    profile_image: { type: String, default: "https://icons-for-free.com/iconfiles/png/512/food+icon-1320184414775447246.png" },
    isAdmin: { type: Boolean, default: false },
}, {
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema);