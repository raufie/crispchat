const express = require("express");
const mongoose = require('mongoose')
const User = require("../../models/User/User");
const axios = require('axios')
const bcrypt = require("bcrypt");
const route = express();

route.post('/', async function (req, res, next) {
    try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        //first create an image'
        //then take the image url and then create 

        const user = await new User({
            username: req.body.username,
            password: req.body.password,
            image: req.body.image,
            securityQuestion: req.body.securityQuestion,
            answer: req.body.answer
        });
        user.save().then(u => {
            res.status(200).send(u)
        }).catch(e => {
            console.log(e.MongoError.errmsg)
            res.status(400).send(e)
        });
    } catch (e) {
        console.log(e.Error)
        res.status(400).send(e)
    }
});
//update users (change passwords, security questions etc, validation on redux)
route.put("/:id", async function (req, res, next) {
    try {
        const u = await User.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.status(200).send(u);//AOK
    } catch (exp) {
        res.status(400).send(exp);
    }
})
route.get("/", async function (req, res, next) {

    try {

        const u = await User.findOne({ username: req.query.username });
        res.status(200).send(u);
    } catch (exp) {
        res.status(400).send(exp);
    }
})
route.get("/id", async function (req, res, next) {

    try {

        const u = await User.findById({ _id: req.query.id });
        res.status(200).send(u);
    } catch (exp) {
        res.status(400).send(exp);
    }
})
route.put("/changepassword/:username", async function (req, res) {
    try {
        //find a user by name
        const user = await User.findOne({ username: req.params.username });
        const isValid = await bcrypt.compare(req.body.oldpassword, user.password);
        // console.log(isValid)
        if (isValid) {
            const salt = await bcrypt.genSalt(10);
            const newHashedPassword = await bcrypt.hash(req.body.newpassword, salt);
            const newUser = await User.findByIdAndUpdate({ _id: user._id }, {
                password: newHashedPassword
            });
            return res.status(200).send(newUser);
        } else {
            return res.status(400).send("INVALID PASSWORD")
        }

    } catch (exp) {
        console.log(exp)
        res.status(400).send(exp)
    }
    //compare the oldpassword with username password
    //change the password after  hashing it

})
route.put("/newpassword/:username", async function (req, res) {
    try {
        const user = await User.findOne({ username: req.params.username });
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(req.body.newpassword, salt);
        const newUser = await User.findOneAndUpdate({ username: req.params.username }, {
            password: newHashedPassword
        });

        res.status(200).send("Password Changed")
    } catch (exp) {
        console.log(exp)
        res.status(400).send("error giving new password")
    }
})
module.exports = route;