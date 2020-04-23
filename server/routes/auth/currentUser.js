const jwt = require("jsonwebtoken");
const User = require("../../models/User/User");
const config = require("config");
const express = require("express");
const route = express.Router();
route.get("/", function (req, res, next) {
    res.status(200).send(req.authenticatedUser);
})

module.exports = route;