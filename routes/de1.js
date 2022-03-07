const express = require('express');

const router = express.Router().use(express.json());

router.get('/', (req, res) => {
    res.send("hello de1");
});

module.exports = router;