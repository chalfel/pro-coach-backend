const { Router } = require('express');

const routes = Router();

const OrderController = require('../controllers/OrderController');


routes.post('/order', OrderController.store);
routes.get('/order', OrderController.index);
routes.get('/order/:id', OrderController.search);
routes.delete('/order/:id', OrderController.delete);
routes.put('/order', OrderController.update);

module.exports = routes;
