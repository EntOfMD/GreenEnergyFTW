const mongoose = require('mongoose');
const { Schema } = mongoose;

const SiteSchema = new Schema({
    name: {
        type: String
    },
    url: {
        type: String
    }
});

mongoose.model('Site', SiteSchema);
