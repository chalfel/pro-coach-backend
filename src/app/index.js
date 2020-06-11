const express = require('express');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

require('./database');

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }
  middleware() {
    this.server.use(cors());
  }
  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;