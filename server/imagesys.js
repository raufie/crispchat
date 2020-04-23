const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require("body-parser");
const crypto = require('crypto');
const multer = require('multer');
const cors = require('cors');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream')
const methodOverride = require('method-override') //so that we can delete without using ajax
const path = require('path')
//real work

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(methodOverride('_method'))//we want to use a query string when we delete stuff

const url = "mongodb://localhost/imagetest";
//create mongo connection
const conn = mongoose.createConnection(url);
//initializing stream
let gfs;
//from the docs
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads')
    // all set!
})
//NOW WE HAVE TO CREATE A STORAGE ENGINE (multer needs a storage engine to handle files)
const storage = new GridFsStorage({
    url,//*** */
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {//generates random names
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'//bucketname should match the collection name in which you are storing files
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });
//mid
//post routes
//@desc upload POST
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file })
})
//@get files
//returning all files in the json, add[]
app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        //check if files

        if (!files || files.length === 0) {
            //
            return res.status(404).json({ error: "No files exist" })
        }
        //now files exist
        return res.json({ files: files })

    })
})

//@route get files by filename
app.get('/files/:filename', (req, res) => {
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
app.delete('/files/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: "uploads" }, (err, gridStore) => {
        if (err) {
            return res.status(200).json({ err });
        }
        res.status(200).send("File Deleted")
    })
})
app.listen(4000, () => {
    console.log("listening at 4000...")
})