const { Router } = require('express');
const UserController = require('../controllers/UserController');
const SessionController = require('../controllers/SessionController');
const routes = Router();

routes.post('/user', UserController.store);
routes.get('/user', UserController.index);
routes.get('/user/:email', UserController.search);
routes.delete('/user/:email', UserController.delete);
routes.put('/user', UserController.update);

routes.post('/session', SessionController.createSession);


module.exports = routes;