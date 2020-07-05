const { Router } = require('express')
const SessionController = require('../controllers/SessionController')

const routes = Router()

routes.get('/session', SessionController.restoreSession)

module.exports = routes
