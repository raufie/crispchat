const mongoose = require('mongoose');
const express = require("express");
const crypto = require('crypto');
const multer = require('multer');
const route = express.Router();
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream')
const path = require('path')

// mongoose.connection.db
const conn = mongoose.connection;
const url = "mongodb://localhost/crispchat"
const storage = new GridFsStorage({
    url,//*** */
    file: (req, file) => {
        console.log(file)
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {//generates random names
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);

                const fileInfo = {
                    filename: filename,
                    originalname: file.originalname,
                    bucketName: 'images'//bucketname should match the collection name in which you are storing files
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });



route.get("/", function (req, res) {
    let gfs;


    gfs = Grid(mongoose.connections[mongoose.connections.length - 1].db, mongoose.mongo);
    gfs.collection('images')
    // all set!
    gfs.files.find().toArray((err, files) => {
        //check if files
        if (!files || files.length === 0) {
            //
            return res.status(400).send(false)
        }
        //now files exist
        console.log(files)
        return res.status(200).send({ files })

    })
})
route.get("/:filename", function (req, res) {
    let gfs;



    gfs = Grid(mongoose.connections[mongoose.connections.length - 1].db, mongoose.mongo);
    gfs.collection('images')
    // all set!
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        //check if files

        if (!file || file.length === 0) {
            //
            return res.status(404).json({ error: "No files exist" })
        }
        //now files exist

        let streamed;
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res)

    })



})
route.post('/', upload.single('file'), (req, res) => {

    res.status(200).json({ file: req.file })
})
module.exports = route;