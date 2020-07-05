const mongoose = require('mongoose')

const Order = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    required: true
  },
  proService: {
    type: mongoose.ObjectId,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  payment_method: {
    type: String
  },
  payment_status: {
    type: String,
    default: 'pending'
  },
  status: {
    type: String,
    default: 'pending'
  },
  created_at: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model('Order', Order)
