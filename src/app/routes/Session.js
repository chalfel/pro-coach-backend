const { Router } = require('express');
const SessionController = require('../controllers/SessionController');

const routes = Router();

routes.post('/session', SessionController.createSession);

module.exports = routes;