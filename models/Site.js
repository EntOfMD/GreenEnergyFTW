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

const Site = mongoose.model('Site', SiteSchema);

module.exports = Site;
