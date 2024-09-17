require('dotenv').config();
const express = require("express");

const app = express();

const PORT = process.env.EXPRESS_PORT || 3000

app.get('/', (req, res) => {
    res.send('<h1>Server is runnning</h1>')
})

app.listen(PORT, (req, res) => {
    console.log(`Server started on url - http://127.0.0.1:${PORT}`)
})