const { Router } = require('express');
const UserController = require('../controllers/UserController');

const User = new UserController;

const routes = Router();

routes.post('/user', User.store);
routes.get('/user', User.index);


module.exports = routes;