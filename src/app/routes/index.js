const { Router } = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/auth');
const OrderRoutes = require('./Order');
const ProServiceRoutes = require('./ProService');
const SessionRoutes = require('./Session');
const UserRoutes = require('./User');
const GameRoutes = require('./Game');

const routes = Router();

routes.post('/user', UserController.store);

routes.use(SessionRoutes);

routes.use(authMiddleware);

routes.use(OrderRoutes);
routes.use(ProServiceRoutes);
routes.use(UserRoutes);
routes.use(GameRoutes);

module.exports = routes;