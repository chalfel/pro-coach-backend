
const { Router } = require('express');
const UserController = require('../controllers/UserController');

const routes = Router();

routes.get('/user', UserController.index);
routes.get('/user/:email', UserController.search);
routes.delete('/user/:email', UserController.delete);
routes.put('/user', UserController.update);


module.exports = routes;