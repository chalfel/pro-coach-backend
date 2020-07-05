const { Router } = require('express')
const UserController = require('../controllers/UserController')
const ProServiceController = require('../controllers/ProServiceController')
const SessionController = require('../controllers/SessionController')
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
routes.post('/session', SessionController.createSession)

routes.use(FileRoutes)
routes.use(authMiddleware)
routes.use(SessionRoutes)

routes.use(ProServiceRoutes)
routes.use(UserRoutes)
routes.use(GameRoutes)
routes.use(OrderRoutes)

module.exports = routes
