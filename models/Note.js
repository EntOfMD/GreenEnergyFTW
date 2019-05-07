const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchama = new Schema({
  name: {
    type: String,
    required: true
  },
  msg: { type: String, required: true },

  date: {
    type: Date,
    default: Date.now
  },
  articleId: {
    type: String,
    required: true
  },
  _articleId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'article'
    }
  ],
  _articleTitle: {
    type: Schema.Types.String,
    ref: 'article'
  }
});

const Note = mongoose.model('note', NoteSchama);
module.exports = Note;
