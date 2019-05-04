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
    image: { type: String },
    _site: {
        type: Schema.Types.ObjectId,
        ref: 'Site'
    }
});

mongoose.model('Article', ArticleSchema);
