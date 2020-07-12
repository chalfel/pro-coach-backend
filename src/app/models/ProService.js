const mongoose = require('mongoose')

const ProService = new mongoose.Schema({
  image: String,
  name: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  description: {
    type: String,
    required: true
  },
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  price: {
    required: true,
    type: Number
  },
  rating: {
    type: Number
  },
  active: {
    type: Boolean,
    default: true
  },
  comments: {
    type: [String]
  },
  game: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  }
})

module.exports = mongoose.model('ProService', ProService)
