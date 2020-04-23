const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require('http').Server(app)
const cors = require("cors");
const url = "mongodb://localhost/crispchat";
const io = require("socket.io")
//local modules
//mongoconnection'
mongoose.connect("mongodb://localhost/crispchat").then(x => {
    console.log("Connected to mongodb...")
}).catch(e => {
    console.log("error connecting to mongodb")
})
//middleswares
app.use(cors())
app.use(bodyParser());
//routes
app.use('/api/signin', require("./routes/signIn.js/signIn"))
app.use('/api/files', require('./routes/files/files'))
app.use("/api/currentuser", require("./auth/authenticate"), require("./routes/auth/currentUser"))
app.use('/api/users', require('./routes/users/users'))
app.use('/api/contacts', require('./routes/contacts/contacts'))
app.use("/api/conversation", require("./auth/authenticate"), require("./routes/conversation/conversation"));
const s = io(http);
s.on("connection", (socket) => {
    console.log(`connected ${socket.id}`)
    // let time = 500;
    // let limit  =500;
    // setTimeout(() => {
    //     time += 500
    // }, limit)
    socket.once("typing", function (data) {
        //we must have a limit here, if we keep sending too much on typing the site freeezes
        // 3 seconds a change is enough, maybe a simpler solution is better
        //1-5-10


        s.sockets.emit("typing", data)


    });
    socket.on("send_message", function (data) {
        s.sockets.emit("new_message", data)
    })
})

http.listen(4000, () => {
    console.log("listening to localhost 4000");
})