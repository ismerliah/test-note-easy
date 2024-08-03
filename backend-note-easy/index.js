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
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(cookieParser())

mongoose.connect("mongodb://127.0.0.1:27017/user", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.post('/api/register', (req, res) => {
    const {username, email, password} = req.body;
    bycrypt.hash(password, 10)
    .then(hash => {
        UserModel.create({username, email, password: hash})
        .then(users => res.json(users))
        .catch(err => res.json(err))
    })
})

app.post('/api/signin', (req ,res) => {
    const { _id, email, password } = req.body

    UserModel.findOne({ email : email })
    .then(user => {
        if (user) {
            bycrypt.compare(password, user.password, (err, response) => {
                if(response) {
                    const token = jwt.sign({ _id: user._id, email : user.email, username : user.username }, 'secret', { expiresIn: '1d' }) 
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: false, // Set to true in production
                        sameSite: 'lax', // Change to 'none' in production if using cross-site cookies
                        maxAge: 3600000 // 1 hour in milliseconds
                      });
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

app.get('/api/user', (req, res) => {
    const token = req.cookies['token']
    if(token) {
        jwt.verify(token, 'secret', (err, user) => {  
            if(err) {
                return res.json("User not authenticated")
            }
            return res.json(user)
        })
    } 
    else {
        return res.json("User not authenticated")
    }
})

app.put('/api/user', async (req, res) => {
    const { id, username, email } = req.body;
    try {
        const user = await UserModel.findByIdAndUpdate(id, { username, email }, { new: true });
        if (!user) {
            return res.status(404).json("User not found");
        }

        // Generate a new token with the updated user information
        const token = jwt.sign({ _id: user._id, email: user.email, username: user.username }, 'secret', { expiresIn: '1d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Set to true in production
            sameSite: 'lax', // Change to 'none' in production if using cross-site cookies
            maxAge: 3600000 // 1 hour in milliseconds
        });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error updating user' });
    }
});

app.post('/api/signout', (req, res) => {
    res.clearCookie('token')
    return res.json("User signed out")
})

app.post('/api/create-notes', (req, res) => {
    NoteModel.create(req.body)
    .then(notes => res.json(notes))
    .catch(err => res.json(err))
})

app.get('/api/getnotes', (req, res) => {
    NoteModel.find()
    .then(notes => res.json(notes))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log('Server is running...')
})