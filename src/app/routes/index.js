const { Router } = require('express');
const UserController = require('../controllers/UserController');
const SessionController = require('../controllers/SessionController');
const ProServiceController = require('../controllers/ProServiceController');
const routes = Router();

routes.post('/user', UserController.store);
routes.get('/user', UserController.index);
routes.get('/user/:email', UserController.search);
routes.delete('/user/:email', UserController.delete);
routes.put('/user', UserController.update);

routes.post('/session', SessionController.createSession);


routes.post('/service', ProServiceController.store);
routes.get('/service', ProServiceController.index);
routes.get('/service/:id', ProServiceController.search);
routes.delete('/service/:id', ProServiceController.delete);
routes.put('/service', ProServiceController.update);



module.exports = routes;