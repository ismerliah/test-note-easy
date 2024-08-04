const mongoose = require('mongoose');

const editHistorySchema = new mongoose.Schema({
  updatedAt: { type: Date, default: Date.now },
  changes: { type: Map, of: String },
});

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  username: String,
  date: String,
  time: String,
  editHistory: [editHistorySchema],
});

const NoteModel = mongoose.model('notes', noteSchema);

module.exports = NoteModel;
