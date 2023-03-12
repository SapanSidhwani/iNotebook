const express = require('express');
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Route 1 : READ all notes using : GET "api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req,res) => {
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error');
    }
});

// ROUTE 2  : CREATE a note using : POST "api/notes/addnote". Login required
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

// ROUTE 3 : UPDATE an existing note using : PUT "api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const {title, description, tag} = req.body;

    // Create a new note 
    const newNote = {};
    if(title){newNote.title = title}
    if(description){newNote.description = description} 
    if(tag){newNote.tag = tag}

    // Find the note to be updated and update it 
    let note = await Note.findById(req.params.id);
    if(!note){ return res(404).status.send("Not Found"); }

    // if authenticated user tries to manipulate the data of another user
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed");
    }
    /*
    new: 
    false => it don't affects the value of this variable , 
    true => it affects the value of this variable
    */   
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});    
    res.json(note);
});
module.exports = router;