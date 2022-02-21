const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("hello de1");
});

module.exports = router;