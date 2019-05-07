const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  img: { type: String },
  text: { type: String },
  date: {
    type: String
  },
  scrapedDate: {
    type: Date,
    default: Date.now
  },
  _note: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
});

const Article = mongoose.model('article', ArticleSchema);
module.exports = Article;
