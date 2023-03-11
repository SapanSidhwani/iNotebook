const jwt = require('jsonwebtoken');
const JWT_SECRET = "r@jaPrAj@";

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add it to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({"error": "Please authenticate using a valid token"});// if auth-token is blank 
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ "error": "Please authenticate using a valid token 1" });// If provided auth-token is incorrect
    }
}
module.exports = fetchuser;