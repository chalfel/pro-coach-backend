const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const path = require('path')
require('dotenv').config()

require('./database')

class App {
  constructor() {
    this.server = express()
    this.middleware()
    this.routes()
  }

  middleware() {
    this.server.use(express.json())
    this.server.use(cors())
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    )
  }

  routes() {
    this.server.use(routes)
  }
}

module.exports = new App().server
