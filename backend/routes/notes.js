const express = require('express');
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Route 1 : Get all notes using : GET "api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req,res) => {
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error');
    }
});

// ROUTE 2  : ADD a note using : POST "api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({min: 5}),
    body('description', 'Description must be atleast 5 characters').isLength({min: 5}),
    body('tag', 'Enter a valid tag')
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {title, description, tag} = req.body;
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();
        res.send(savedNote);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error');
    }
});
module.exports = router;