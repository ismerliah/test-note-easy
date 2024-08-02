const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title : {
        type: String,      
    },
    content : {
        type: String,        
    },
    date : {
        type: String, 
    }
})

const NoteModel = mongoose.model('notes', NoteSchema)
module.exports = NoteModel