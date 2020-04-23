const express = require("express");
const route = express.Router();
const User = require("../../models/User/User")
const Contact = require("../../models/Contact/Contact");
const Conversation = require("../../models/Conversation/Conversation")
/// /api/contacts/new post to make new contact


route.post("/new", async function (req, res, next) {
    //only to be used when there is no relation between the two userss
    //req.body ==== new contact id as userId
    //req.body also takes currentUserId
    //userId, conversation
    try {
        console.log(req.body)
        if (req.body.userId === req.body.currentUserId) {

        }
        //adds a person again
        const conversationModel = new Conversation({
            messages: []
        });
        const conversation = await conversationModel.save();

        const user = await User.findById({ _id: req.body.currentUserId });
        const receivingUser = await User.findById({ _id: req.body.userId });
        //creating contactmodel to be stored in the current user
        const contactModel = await new Contact({
            userId: req.body.userId,
            conversation: conversation
        })
        //console.log("line 20 sun")
        const contact = await contactModel.save()
        //creating contactmodel for saving in the receiver's contacts    
        const receivingContactModel = await new Contact({
            userId: req.body.currentUserId,
            conversation: conversation
        })
        const receivingContact = await receivingContactModel.save()

        console.log("line 25 does run")


        user.data.contacts = [...user.data.contacts, contact._id];
        receivingUser.data.contacts = [...receivingUser.data.contacts, receivingContact._id];
        await receivingUser.save();
        const newUser = await user.save();

        console.log("line 29 runs")

        res.status(200).send(newUser);

    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
})
//returnn the loaded contacts, with queryname username

route.get("/", async function (req, res, next) {
    //query.username, query.contactid
    //find user by username
    //run a
    try {
        const user = await User.findOne({ username: req.query.username })
        const contact = await Contact.findById({ _id: req.query.contactid });
        res.status(200).send(contact);
    } catch (exp) {
        res.status(400).send(contact)
    }
})
//get all the contacts loaded
route.get("/loadcontacts/", async function (req, res, next) {
    //get all the contacts of a specific user
    //query username, 
    try {
        const user = await User.findOne({ username: req.query.username });
        let contacts = [];
        const len = user.data.contacts.length;
        console.log(len)
        let i = 0;
        if (!user.data.contacts.length) {
            console.log(req.query.username)
            return res.status(400).send("NO_CONTACTS")
        }
        user.data.contacts.map(async (contact, index) => {
            try {
                const foundContact = await Contact.findById({ _id: contact });
                const newUser = await User.findById({ _id: foundContact.userId });
                console.log(++i)
                if (len === index + 1) {
                    contacts.push({ user: newUser, conversation: foundContact.conversation });
                    console.log(contacts)
                    return res.status(200).send(contacts)
                } else {
                    contacts.push({ user: newUser, conversation: foundContact.conversation });
                }

            } catch (exp) {
                res.status(400).send(exp)
            }
        }
        )

    } catch (e) {
        res.status(400).send(e)
    }
})
module.exports = route;
