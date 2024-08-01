const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bycrypt = require('bcrypt')


const UserModel = require('./models/user')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/user");

app.post('/signin', (req ,res) => {
    const { email, password } = req.body
    UserModel.findOne({ email : email})
    .then(user => {
        const match = bycrypt.compare(password, user.password)
        if(user) {
            if(match) {
                res.json("Success")
            } else {
                res.json("incorrect password") 
            }   
        } else {
            res.json("User not found")
        }
        
    })
})

app.post('/register', (req, res) => {
    const passwordHash = bycrypt.hash(req.body.password, 10)
    UserModel.create({...req.body, password: passwordHash})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log('Server is running...')
})