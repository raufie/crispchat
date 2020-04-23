//conversation js should provides routes for gettings all the messages in a conversation and also sending messages to a conversation
const express = require("express");
const Conversation = require("../../models/Conversation/Conversation");
const Message = require("../../models/Message/Message")
const route = express.Router();
const host = "http://localhost:4000"
route.get('/:id', async function (req, res, next) {
    ///get messages first
    ///find the messages
    //send them back (make the source of it too. )
    console.log("dayyuummm")
    try {
        const conversation = await Conversation.findById({ _id: req.params.id });
        const renderedMessages = [];
        const len = conversation.messages.length;
        if (!conversation.messages) {
            res.send([])
        }
        conversation.messages && conversation.messages.map(async (msgId, index) => {
            const message = await Message.findById({ _id: msgId });

            if (message.dataType === "image") {
                const imageUrl = `${host}/api/files/${message.payload}`;
                renderedMessages.push({ ...message, imageUrl })
                if (len === index + 1) {
                    return res.send(renderedMessages)
                }
            } else {
                renderedMessages.push(message)
                if (len === index + 1) {
                    return res.send(renderedMessages)
                }
            }
        })
    } catch (exp) {
        res.status(400).send(exp);
    }
})
route.post("/:id", async function (req, res, next) {
    console.log("YEAH DR WHITE")
    try {
        //payload, dataType, sender, createdAt
        const conversation = await Conversation.findById({ _id: req.params.id });
        const message = await new Message(req.body);
        const savedMessage = await message.save();
        conversation.messages = [...conversation.messages, message._id];
        await conversation.save();
        res.status(200).send(conversation)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = route;