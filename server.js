const express = require('express');
const Database = require('./db');

const DBurl = 'mongodb+srv://391:' + process.env.DBpassword + '@cluster0.qh5yv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const app = express();
const db = new Database(DBurl, 'cpen391');


app.get('/', (req, res) => {
    res.send("hello");
    var song = {
        id: 1,
        name: song1
    }
    db.add(song);
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