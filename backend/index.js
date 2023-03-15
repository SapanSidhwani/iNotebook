// npm init
// npm i mongoose express express-validator
// npm i bcryptjs jsonwebtoken dotenv (v-49)
const connectToMongo = require('./db');
const express = require('express');
const app = express();

connectToMongo();
const PORT = 5000;
app.use(express.json())

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(PORT, () => {
    console.log(`iNotebook backend listening at http://localhost:${PORT}`);
});