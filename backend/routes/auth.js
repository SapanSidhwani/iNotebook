const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// ROUTE 1 : Create a User using: POST "/api/auth/creatuser". No login required 
router.post('/createuser', [
    body('email', 'enter a valid email').isEmail(),
    body('name', 'enter a valid name').isLength({ min: 2 }),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    // If there are any errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    try {
        
        const JWT_SECRET = "r@jaPrAj@";

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt); // secPass: secured password

        // Check whether the user with this email exists already
        let user = await User.findOne({email: req.body.email});
        if(user) {
            return res.status(400).json({"error": "Sorry a user with this email already exists"});
        }
        else {

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            });

            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({authToken});
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error');
    }
});

// ROUTE 2 : Authenticate a user using : POST "api/auth/login".No login required 
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {

    // If there are any errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        
        const JWT_SECRET = "r@jaPrAj@";
        const {email, password} = req.body;

        // Check : email 
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        // Check : password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error');
    }
});

// ROUTE 3 : Get loggedin user details using : POST "api/auth/getuser".Login required 
router.post('/getuser', fetchuser, async (req, res) => {
    
    try {
       const userId = req.user.id;
       const userData = await User.findById(userId).select("-password"); // select complete data of user except password 
       res.json(userData);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error');
    }
});
module.exports = router;