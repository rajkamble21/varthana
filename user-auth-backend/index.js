require('dotenv').config();
const express = require("express");
const cors = require("cors")
const authRoute = require("./routes/authRoute")
const userRoute = require("./routes/userRoute")



const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}))

app.use(express.json());

const PORT = process.env.EXPRESS_PORT || 4000

app.get('/', (req, res) => {
    res.send('<h1>Server is runnning</h1>')
})

app.use('/auth', authRoute)
app.use('/users', userRoute)

app.listen(PORT, (req, res) => {
    console.log(`Server started on url - http://127.0.0.1:${PORT}`)
})