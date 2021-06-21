const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin", "restorer", "delivery"]
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)