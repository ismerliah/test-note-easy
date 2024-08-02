const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


const UserModel = require('./models/user')
const NoteModel = require('./models/note')

const app = express()
app.use(express.json())
app.use(cors())

app.use(cookieParser())

mongoose.connect("mongodb://127.0.0.1:27017/user");

app.post('/api/register', (req, res) => {
    const passwordHash = bycrypt.hash(req.body.password, 10)
    UserModel.create({...req.body, password: passwordHash})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/api/signin', (req ,res) => {
    const { email, password } = req.body

    UserModel.findOne({ email : email})
    .then(user => {
        if (user) {
            bycrypt.compare(password, user.password, (err, response) => {
                if(response) {
                    const token = jwt.sign({ email }, 'secret', { expiresIn: '1h' }) 
                    res.cookie('token', token)
                    return res.json("User signed in")
                } else {
                    return res.json("Email or password is incorrect")
                }
            })
        } else {
            return res.json("User not found")
        }

    })
})

app.post('/api/signout', (req, res) => {
    res.clearCookie('token')
    return res.json("User signed out")
})

app.post('/note', (req, res) => {
    NoteModel.create(req.body)
    .then(notes => res.json(notes))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log('Server is running...')
})