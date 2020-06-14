const User = require('../models/User');
const UserLib = require('../lib/UserLib');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class SessionController {

  async createSession(req, res) {
    const { email, password } = req.body;
    const user = await UserLib.getExistentUser(email);
    
    try {
      
      if(!user) return res.status(400).json({ message: 'User not found' })
      if(!(user.checkPassword(password))) return res.status(400).json({ message: 'Incorrect password'})

      const { _id: id, name, email, pro } = user;
      const token = jwt.sign({id, email, pro}, process.env.SECRET, { expiresIn: process.env.EXPIRE_TIME})
      console.log(token);

      console.log(jwt.decode(token));
      

      return res.status(200).json({
        token,
        name,
        email,
        pro
      })

    } catch(e) {
      console.log(e);
      return res.status(500).json({ error: e })
    }

  }

}

module.exports = new SessionController();