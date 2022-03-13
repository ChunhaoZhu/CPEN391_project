const express = require('express');
const db = require('../db');
const bodyParser = require('body-parser');
const fs = require('fs');
const { GridFsStorage } = require('multer-gridfs-storage');

const router = express.Router().use(bodyParser.json());

router.get('/', (req, res) => {
    res.send("hello de1");
});

router.put('/:filename', bodyParser.raw({
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
        db.initgfsbucket('de1').then((bucket) => {
            fs.createReadStream('./videos/' + v).
            pipe(bucket.openUploadStream(v, {
                chunkSizeBytes: 1048576,
                metadata: { field: 'myField', value: 'myValue' }
            }))
            fs.unlink('./videos/' + v, (err) => {
                if (err) {
                  console.error(err)
                }
            })
            res.send("de1 upload sucessful");
        });
    });
});

router.get('/:filename', (req, res) => {
    db.initgfs('de1').then((result) => {
        result.files.findOne({filename: req.params.filename }).then((file) => {
            if (!file || file.length === 0) {
              return res.status(404).json({
                err: 'No file exists'
              });
            }
            db.initgfsbucket('de1').then((bucket) => {
                bucket.openDownloadStream(file._id).pipe(res);
            });
          });
    })

});

router.delete('/:filename', (req, res) => {
    db.initgfs('de1').then((result) => {
        result.files.findOne({filename: req.params.filename }).then((file) => {
            if (!file || file.length === 0) {
              return res.status(404).json({
                err: 'No file exists'
              });
            }
            db.initgfsbucket('de1').then((bucket) => {
                bucket.delete(file._id);
                res.send("de1 delete successful");
            });
          });
    })
})

module.exports = router;