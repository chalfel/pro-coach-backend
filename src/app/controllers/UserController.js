const User = require('../models/User');

class UserController {

  async store(req, res) {
    try {
      const { body: user } = req
      const newUser = await User.create(user)
      return res.status(200).json(newUser)
    } catch(e) {
      console.log(e);
      return res.status(500).json({ error: e})
    }
  }
  async search(req, res) {}
  async index(req, res) {
    try {
      const users = await User.find({});

      return res.status(200).json(users);
    }catch(e) {
      return res.status(500).json({ error: e});
    }

  }
  async delete(req, res) {}
  async update(req, res) {}

}

module.exports = UserController;