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
    type: mongoose.ObjectId
  },
  price: {
    required: true,
    type: Number
  },
  rating: {
    type: String
  },
  active: Boolean,
  comments: {
    type: [String]
  },
  game: {
    required: true,
    type: mongoose.ObjectId
  }
})

module.exports = mongoose.model('ProService', ProService)
