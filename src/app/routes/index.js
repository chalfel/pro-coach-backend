const { Router } = require('express')
const UserController = require('../controllers/UserController')
const ProServiceController = require('../controllers/ProServiceController')
const OrderRoutes = require('./Order')
const ProServiceRoutes = require('./ProService')
const SessionRoutes = require('./Session')
const UserRoutes = require('./User')
const GameRoutes = require('./Game')
const FileRoutes = require('./File')
const PaymentRoutes = require('./Payment')

const authMiddleware = require('../middleware/auth')
const apiMiddleware = require('../middleware/api')

const routes = Router()

routes.use(PaymentRoutes)

routes.use(apiMiddleware)

routes.post('/user', UserController.store)
routes.get('/coach-service', ProServiceController.index)
routes.get('/coach-service/:id', ProServiceController.search)

routes.use(SessionRoutes)

routes.use(authMiddleware)

routes.use(ProServiceRoutes)
routes.use(UserRoutes)
routes.use(GameRoutes)
routes.use(OrderRoutes)
routes.use(FileRoutes)

module.exports = routes
