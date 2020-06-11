const User = require('../models/User');

class UserController {

  async index(req, res) {
    return res.send("Hello")
  }
  async search(req, res) {}
  async store(req, res) {}
  async delete(req, res) {}
  async update(req, res) {}

}

module.exports = UserController;