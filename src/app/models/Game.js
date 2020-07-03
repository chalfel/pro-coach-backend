const mongoose = require('mongoose')

const Game = new mongoose.Schema({
  gameTitle: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Game', Game)
