const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
    payload: {
        type: String,
        minlength: 1,
        required: true
    },
    dataType: {
        type: String,
        enum: ['image', 'text'],
        default: 'text',
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isReadBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
const Message = mongoose.model("message", MessageSchema);
module.exports = Message;