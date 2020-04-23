const mongoose = require('mongoose');
const ConversationSchema  = new mongoose.Schema({
    messages : {
        type: [mongoose.Schema.Types.ObjectId],
        ref:'Message',
    }
})

const Conversation = mongoose.model('conversation', ConversationSchema);
module.exports = Conversation;