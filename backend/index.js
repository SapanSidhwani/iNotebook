// npm init
// npm i mongoose express
const connectToMongo = require('./db');
const express = require('express');
const app = express();

connectToMongo();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});