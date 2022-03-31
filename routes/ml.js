const express = require('express');
const db = require('../db');
const bodyParser = require('body-parser');
const fs = require('fs');
const { GridFsStorage } = require('multer-gridfs-storage');
var XMLHttpRequest = require('xhr2');
const { resolve } = require('path');

const router = express.Router().use(bodyParser.json());


router.get('/:room', (req, res) => {
    collection_name = req.params["room"] + "_eval"
    db.get(collection_name).then((result) => {
        res.send(result);
    })
});

router.post('/:room', (req, res) => {
    collection_name = req.params["room"] + "_eval"
    db.add(collection_name,req.body).then((result) => {
        res.send("hello post from eval");
    })
});

router.delete('/:room', (req, res) => {
    collection_name = req.params["room"] + "_eval"
    db.deleteAll(collection_name).then((result) => {
        res.send("delete all successful");
    })
})

module.exports = router;