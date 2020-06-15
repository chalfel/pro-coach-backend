const mongoose = require('mongoose');

const Game = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    picture_url: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Game', Game);
