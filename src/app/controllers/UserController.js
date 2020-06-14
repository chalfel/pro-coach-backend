const User = require('../models/User');
const UserLib = require('../lib/UserLib');
class UserController {

  async store(req, res) {
    try {
      const { body: user } = req

      const found = await UserLib.getExistentUser(user.email);
      
      if(found) return res.status(400).json({ message: 'User already exists'})
      const newUser = await User.create(user)
      return res.status(200).json(newUser)
    } catch(e) {
      console.log(e);
      return res.status(500).json({ error: e})
    }
  }
  async search(req, res) {
    const { email } = req.params;
    try {
      const user = await User.findOne({ email });

     return res.status(200).json(user);
    } catch(e) {
      console.log(e);
      return res.status(500).json({ error: e })
    }
  } 
  async index(req, res) {
    try {
      const users = await User.find({});
      return res.status(200).json(users);
    }catch(e) {
      return res.status(500).json({ error: e});
    }

  }
  async delete(req, res) {
    const { email } = req.params;
    try {
      const userFound = await UserLib.getExistentUser(email);

      if (!userFound) return res.status(400).json({ message: "User not found"});

      await User.deleteOne({ email });

      return res.status(200).json({ message: "User was deleted"});
    } catch(e) {
      return res.status(500).json({ error: e});
    }

  }
  async update(req, res) {
    const { body: user } = req;
    
    try {
      const { email } = user;
      const userFound = await UserLib.getExistentUser(email);
      if (!userFound) return res.status(400).json({ message: "User not found"})
      const updatedUser = await User.findByIdAndUpdate(userFound.id, {...user}, { new: true});
      return res.status(200).json(updatedUser);
    } catch(e) {
      console.log(e);
      return res.status(500).json({ error: e})
    }

  }

}

module.exports = new UserController();