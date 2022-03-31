const express = require('express');
const db = require('../db');
const bodyParser = require('body-parser');
const fs = require('fs');
const { GridFsStorage } = require('multer-gridfs-storage');

const router = express.Router().use(express.json());

let run = 0;
let room_num = 'room1';

router.get('/', (req, res) => {//sent from ml server
    let x = {
        "run": run,
        "room_num": room_num
    }
    // console.log(x)
    res.send(x);
});

router.post('/', (req, res) => { //sent from sensor
    room_num = req.headers['room_num'];
    run = 1;
    // res.send("sensor post successful");
    res.send(req.headers);
});

router.post('/disable', (req, res) => { //sent from ml server
    run = 0;
    res.send("set run to 0");
});

module.exports = router;