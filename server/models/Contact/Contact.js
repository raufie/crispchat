const mongoose = require('mongoose');
const ContactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: false,
        required: true,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true
    }
})
const Contact = mongoose.model('contact', ContactSchema);
module.exports = Contact;