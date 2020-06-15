const { Router } = require('express');
const UserController = require('../controllers/UserController');
const SessionController = require('../controllers/SessionController');
const ProServiceController = require('../controllers/ProServiceController');
const GameController = require('../controllers/GameController');
const authMiddleware = require('../middleware/auth');
const routes = Router();

routes.post('/user', UserController.store);

routes.post('/session', SessionController.createSession);

routes.use(authMiddleware);

routes.get('/user', UserController.index);
routes.get('/user/:email', UserController.search);
routes.delete('/user/:email', UserController.delete);
routes.put('/user', UserController.update);

routes.post('/service', ProServiceController.store);
routes.get('/service', ProServiceController.index);
routes.get('/service/:id', ProServiceController.search);
routes.delete('/service/:id', ProServiceController.delete);
routes.put('/service', ProServiceController.update);

routes.post('/game', GameController.store);
routes.get('/game', GameController.index);
routes.get('/game/:id', GameController.search);
routes.delete('/game/:id', GameController.delete);
routes.put('/game', GameController.update);



module.exports = routes;