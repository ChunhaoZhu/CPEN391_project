const express = require('express');
const db = require('./db');
const webRoute = require('./routes/web.js');
const de1Route = require('./routes/de1.js');
const videoRoute = require('./routes/video.js');
const sensorRoute = require('./routes/sensor.js');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8000;

app.use('/web', webRoute);
app.use('/de1', de1Route);
app.use('/video', videoRoute);
app.use('/sensor', sensorRoute);

app.listen(port, () => {
    console.log(`Server starts.`);
})

app.get('/', (req, res) => {
    res.send("hello");
});


