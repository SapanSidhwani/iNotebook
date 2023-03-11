const express = require('express');
const Notes = require('../models/Notes');
const router = express.Router();

router.post('/', (req, res) => {

    const notes = Notes(req.body);
    notes.save();
    res.send("hello");
});
module.exports = router;