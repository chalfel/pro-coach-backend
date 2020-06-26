const { Router } = require('express')

const PaymentController = require('../controllers/PaymentController')

const routes = Router()

routes.get('/payment/success', PaymentController.success)

module.exports = routes
