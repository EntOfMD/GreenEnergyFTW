const mongoose = require('mongoose');
const { Schema } = mongoose;

const CarouselSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },
    poster: {
        type: String,
        required: true
    }
});

const Carousel = mongoose.model('carousel', CarouselSchema);
module.exports = Carousel;
