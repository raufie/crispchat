const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require("config")
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minlength: 4,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    },
    securityQuestion: {
        type: String,
        minlength: 5,
        required: true
    },
    answer: {
        type: String,
        minlength: 1,
        required: true,
    },
    data: {
        contacts: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Contact'
        }
    },
    image: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    }
})
UserSchema.methods.getAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get("jwtkey"))
    return token
}
const User = mongoose.model('user', UserSchema);
module.exports = User;