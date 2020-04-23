const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require("express");
const route = express.Router();
const User = require("../../models/User/User")
route.post('/', async function (req, res) {

    //username, password
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).send("No User Found With That username")
        }
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (isValid) {
            const token = user.getAuthToken();
            console.log("A USER LOGGED IN")
            res.status(200).send(token)
        } else {
            res.status(400).send("INVALID PASSWORD ")
        }
    } catch (e) {
        res.status(400).send(e)
    }
})
module.exports = route;