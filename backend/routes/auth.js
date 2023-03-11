const express = require('express');
const User = require('../models/User')
const router = express.Router();
const {body, validationResult} = require('express-validator')

// Create a User using: POST "/api/auth/creatuser". No login required 
router.post('/createuser', [
    body('name', 'enter a valid name').isAlpha().isLength({ min: 2 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    // If there are any errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    try {
        
        // Check whether the user with this email exists already
        let user = await User.findOne({email: req.body.email});
        if(user) {
            return res.status(400).json({"error": "Sorry a user with this email already exists"});
        }
        else {

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            res.json(user);
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Some error occured');
    }
});
module.exports = router;