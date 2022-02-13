const express = require('express');
const app1 = express();
const app2 = express();

app1.get('/web', (req, res) => {
    res.send("hello");
});

app1.listen(process.env.PORT, () => {
    console.log("mmm");
})

app2.get('/de1', (req, res) => {
    res.send("hello de1");
});

app2.listen(process.env.PORT, () => {
    console.log("nnn");
})