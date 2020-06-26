const { Router } = require('express')
const ProServiceController = require('../controllers/ProServiceController')

const routes = Router()

routes.post('/service', ProServiceController.store)
routes.get('/service', ProServiceController.index)
routes.get('/service/:id', ProServiceController.search)
routes.delete('/service/:id', ProServiceController.delete)
routes.put('/service', ProServiceController.update)

module.exports = routes
