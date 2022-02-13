const express = require('express');
const app = express();

app.get('/web', (req, res) => {
    res.send("hello web");
});

app.get('/de1', (req, res) => {
    res.send("hello de1");
});

app.listen(process.env.PORT, () => {
    console.log("nnn");
})