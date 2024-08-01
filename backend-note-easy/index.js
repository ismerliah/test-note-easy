const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/user");

app.post('/register', async (req, res) => {
    const { email, username, password } = req.body
    console.log(email, username, password)
    res.send('ok')
})

app.listen(3001, () => {
    console.log('Server is running...')
})