// npm init
// npm i mongoose express express-validator
const connectToMongo = require('./db');
const express = require('express');
const app = express();

connectToMongo();
const PORT = 3000;
app.use(express.json())

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});