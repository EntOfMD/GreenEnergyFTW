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
    site: {
        type: Schema.Types.ObjectId,
        ref: 'Site'
    }
});

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;
