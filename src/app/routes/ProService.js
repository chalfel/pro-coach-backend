const { Router } = require('express')
const ProServiceController = require('../controllers/ProServiceController')

const routes = Router()

routes.post('/coach-service', ProServiceController.store)

routes.delete('/coach-service/:id', ProServiceController.delete)
routes.put('/coach-service', ProServiceController.update)

module.exports = routes
