const mongoose = require('mongoose')
const generate = require('../../../helpers/generate.heplers')
const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    token: String,

    phone: String,
    avatar: String,
    status: String,
    deletedAt: Date,
    deleted: {
        type: Boolean, default: false
    },
}, { timestamps: true });
const User = mongoose.model('User', userSchema, "users");
module.exports = User;