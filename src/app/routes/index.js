const { Router } = require('express');
const UserController = require('../controllers/UserController');
const OrderRoutes = require('./Order');
const ProServiceRoutes = require('./ProService');
const SessionRoutes = require('./Session');
const UserRoutes = require('./User');
const GameRoutes = require('./Game');

const authMiddleware = require('../middleware/auth');
const apiMiddleware = require('../middleware/api');

const routes = Router();

routes.use(apiMiddleware);

routes.post('/user', UserController.store);

routes.use(SessionRoutes);

routes.use(authMiddleware);

routes.use(ProServiceRoutes);
routes.use(UserRoutes);
routes.use(GameRoutes);
routes.use(OrderRoutes);

module.exports = routes;