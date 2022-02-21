const express = require('express');
const db = require('./db');
const webRoute = require('./routes/web.js');
const de1Route = require('./routes/de1.js');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json()) 

app.use('/web', webRoute);
app.use('/de1', de1Route);

app.listen(port, () => {
    console.log(`Server starts.`);
})

app.get('/', (req, res) => {
    // var person = {
    //     _id: 1,
    //     first_name: 'John',
    //     last_name: 'A'
    // }
    // db.add1(person);
    res.send("hello");
});



