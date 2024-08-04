const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


const UserModel = require('../models/user')
const NoteModel = require('../models/note')
const CategoryModel = require('../models/note-category')

const app = express()
app.use(express.json())

const cors = require('cors');
app.use(cors({
  origin: 'https://test-note-easy-fe.vercel.app'
}));
app.options('*', cors());

app.use(cookieParser())

mongoose.connect("mongodb+srv://6410110649:Q5LmPWlqFii2B8HJ@cluster0.y0dewmc.mongodb.net/user", {
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
                    const token = jwt.sign({ _id: user._id, email : user.email, username : user.username }, 'secret', { expiresIn: '1hr' }) 
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: true, // Set to true in production
                        sameSite: 'none', // Change to 'none' in production if using cross-site cookies
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

app.put('/api/edit-user', async (req, res) => {
    const { id, username, email } = req.body;
    try {
        const user = await UserModel.findByIdAndUpdate(id, { username, email }, { new: true });
        if (!user) {
            return res.status(404).json("User not found");
        }

        // Generate a new token with the updated user information
        const token = jwt.sign({ _id: user._id, email: user.email, username: user.username }, 'secret', { expiresIn: '1hr' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, // Set to true in production
            sameSite: 'none', // Change to 'none' in production if using cross-site cookies
            maxAge: 3600000 // 1 hour in milliseconds
        });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error updating user' });
    }
});

app.post('/api/signout', (req, res) => {
    res.clearCookie('token');
    return res.json("User signed out");
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

app.get('/api/getnotes/:id', (req, res) => {
    NoteModel.findById(req.params.id)
    .then(notes => res.json(notes))
    .catch(err => res.json(err))
})

app.put('/api/edit-notes/:id', async (req, res) => {
    try {
      const note = await NoteModel.findById(req.params.id);
      if (!note) {
        return res.status(404).send({
          message: `Note with id ${req.params.id} not found`,
        });
      }
  
      const changes = {};
      for (const key in req.body) {
        if (note[key] !== req.body[key]) {
          changes[key] = note[key];
        }
      }
  
      note.set(req.body);
      note.editHistory.push({ changes });
      const updatedNote = await note.save();
  
      res.send(updatedNote);
    } catch (error) {
      res.status(500).send({
        message: `Error updating note with id ${req.params.id}`,
        error: error.message,
      });
    }
  });
  
app.post('/api/category', (req, res) => {
    const { name, notes } = req.body;
    CategoryModel.create({ name, notes })
    .then(categories => res.json(categories))
    .catch(err => res.json(err))
})

app.get('/api/getcategories', (req, res) => {
    CategoryModel.find()
    .then(categories => res.json(categories))
    .catch(err => res.json(err))
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));