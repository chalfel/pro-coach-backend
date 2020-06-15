const { Router } = require('express');
const GameController = require('../controllers/GameController');

const routes = Router();

routes.post('/game', GameController.store);
routes.get('/game', GameController.index);
routes.get('/game/:id', GameController.search);
routes.delete('/game/:id', GameController.delete);
routes.put('/game', GameController.update);

module.exports = routes;