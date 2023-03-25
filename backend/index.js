// npm init
// npm i mongoose express express-validator
// npm i bcryptjs jsonwebtoken dotenv (v-49)
// npm i cors (v-65)
const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

connectToMongo();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json())

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(PORT || process.env.PORT, () => {
    console.log(`iNotebook backend listening at http://localhost:${PORT}`);
});