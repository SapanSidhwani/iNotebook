const express = require('express');
const Notes = require('../models/Notes');
const router = express.Router();
const { body, validationResult } = require('express-validator')

router.post('/', [
    body('title'),
    body('description'),
    body('tag')
], (req, res) => {

    const errors = validationResult(req.body);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    Notes.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag
    })
    .then(note => res.json(note))
    .catch((err) => {

        console.log(err);
        let errMessage;
        if(!req.body.title)
            errMessage = "Title is Empty";
        if (!req.body.description)
            errMessage = "Description is Empty";

        res.json({
            "error": errMessage,
            "message": err.message
        })
    })
});
module.exports = router;