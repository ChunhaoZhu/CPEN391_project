const express = require('express');
const Database = require('./db');

const DBurl = 'mongodb+srv://391:' + process.env.DBpassword + '@cluster0.qh5yv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const app = express();
const db = new Database(DBurl, 'cpen391');

app.use(express.json()) 

app.get('/', (req, res) => {
    var song = {
        _id: 1,
        name: 'song1'
    }
    db.add(song);
    res.send("hello");
});

app.post('/web', (req, res, next) => {
    db.add(req.body).then((result) => {
        res.send("hello post");
    })
});


app.get('/web', (req, res) => {
    res.send("hello web");
});

app.get('/de1', (req, res) => {
    res.send("hello de1");
});

app.listen(process.env.PORT, () => {
    console.log("nnn");
})