const jwt = require("jsonwebtoken");
const User = require("../models/User/User");
const config = require("config");
const authenticate = async (req, res, next) => {
    //get token from the header, validate the token and if it exists then AOK next()

    try {

        const token = req.header("x-auth-token");
        const decodedToken = jwt.verify(token, config.get("jwtkey"));
        //now match it
        const user = await User.findById({ _id: decodedToken._id });
        if (user) {
            req.authenticatedUser = user;
            next();
        } else {
            res.status(400).send("REQUESTED USER HAS BEEN DELETED FROM THE DATABASE")

        }
    } catch (e) {
        res.status(400).send("Access denied, invalid token")
    }
}
module.exports = authenticate;