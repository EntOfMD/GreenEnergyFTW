const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactMeSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    msg: { type: String, required: true },
    link: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    socialHandle: {
        type: String
    }
});

const Contact = mongoose.model('contact', ContactMeSchema);
module.exports = Contact;
