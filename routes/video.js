const express = require('express');
const db = require('../db');
const bodyParser = require('body-parser');
const fs = require('fs');
const { GridFsStorage } = require('multer-gridfs-storage');
var XMLHttpRequest = require('xhr2');
const { resolve } = require('path');

const router = express.Router().use(bodyParser.json());

router.get('/', (req, res) => {
    res.send("hello video");
});

router.post('/:filename', bodyParser.raw({
    limit: '300mb', 
    type: 'video/*'
}), (req, res) => {
    const v = req.params.filename;
    const fd = fs.createWriteStream(`./videos/${v}`, {
        flags: "w+",
        encoding: "binary"
    });
    fd.end(req.body);
    fd.on('close', () => {
        db.initgfsbucket('web').then((bucket) => {
            fs.createReadStream('./videos/' + v).
            pipe(bucket.openUploadStream(v, {
                chunkSizeBytes: 1048576,
                metadata: { field: 'myField', value: 'myValue' }
            })).
            on('finish', () => {
                fs.unlink('./videos/' + v, (err) => {
                    if (err) {
                      console.error(err)
                    }
                })
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "http://localhost:8080");
                xhr.setRequestHeader("filename", req.params.filename);
                xhr.send();
                res.send("upload sucessful");
            });
        });
    });
});

router.get('/:filename', (req, res) => {
    db.initgfs('web').then((result) => {
        result.files.findOne({filename: req.params.filename }).then((file) => {
            if (!file || file.length === 0) {
              return res.status(404).json({
                err: 'No file exists'
              });
            }
            db.initgfsbucket('web').then((bucket) => {
                bucket.openDownloadStream(file._id).pipe(res);
            });
          });
    })

});

router.delete('/:filename', (req, res) => {
    db.initgfs('web').then((result) => {
        result.files.findOne({filename: req.params.filename }).then((file) => {
            if (!file || file.length === 0) {
              return res.status(404).json({
                err: 'No file exists'
              });
            }
            db.initgfsbucket('web').then((bucket) => {
                bucket.delete(file._id);
                res.send("delete successful");
            });
          });
    })
})

module.exports = router;