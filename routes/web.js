const express = require('express');
const db = require('../db');

const router = express.Router().use(express.json()) ;

router.get('/', (req, res) => {
    res.send("hello web.");
});

router.get('/:room', (req, res) => {
    db.get(req.params["room"]).then((result) => {
        res.send(result);
    })
});

router.post('/:room', (req, res, next) => {
    console.log(req.body);
    console.log(req.files);
    db.add(req.params["room"],req.body).then((result) => {
        console.log(req.body);
        res.send("hello post");
    })
});

router.delete('/:room/:name', (req, res) => {
    db.delete(req.params["room"], req.params["name"].split("_")[0], req.params["name"].split("_")[1]).then((result) => {
        res.send(result);
    })
})

module.exports = router;