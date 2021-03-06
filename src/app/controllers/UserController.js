const User = require('../models/User')
const UserLib = require('../lib/User')
const Yup = require('yup')
const { validateUserEmail } = require('../lib/User')
class UserController {
  async store(req, res) {
    try {
      const { body: user } = req
      const schema = Yup.object().shape({
        username: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(6),
        confirmPassword: Yup.string().min(6),
        imgUrl: Yup.string().nullable()
      })
      if (!(await schema.isValid(user))) {
        return res.status(400).json({ message: 'Bad Request' })
      }

      if (user.password !== user.confirmPassword) {
        return res.status(400).json({ message: "Password doesn't match" })
      }

      const found = await UserLib.getExistentUser(user.email)

      if (found) return res.status(400).json({ message: 'User already exists' })
      const { username, email } = await User.create(user)
      return res.status(200).json({ username, email })
    } catch (e) {
      return res.status(500).json({ error: e })
    }
  }

  async search(req, res) {
    const { params } = req

    if (!(await validateUserEmail(params))) {
      return res.status(400).json({ message: 'Bad Request' })
    }

    const { email } = params

    try {
      const user = await User.findOne({ email }, { password_hash: 0 })

      return res.status(200).json(user)
    } catch (e) {
      return res.status(500).json({ error: e })
    }
  }

  async index(req, res) {
    try {
      const users = await User.find({}, { password_hash: 0 })
      return res.status(200).json(users)
    } catch (e) {
      return res.status(500).json({ error: e })
    }
  }

  async delete(req, res) {
    const { params } = req

    if (!(await validateUserEmail(params))) {
      return res.status(400).json({ message: 'Bad Request' })
    }

    const { email } = params

    try {
      const userFound = await UserLib.getExistentUser(email)

      if (!userFound) return res.status(400).json({ message: 'User not found' })

      await User.deleteOne({ email })

      return res.status(200).json({ message: 'User was deleted' })
    } catch (e) {
      return res.status(500).json({ error: e })
    }
  }

  async update(req, res) {
    const { user } = req.body
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email().required(),
      discord: Yup.string(),
      skype: Yup.string(),
      username: Yup.string(),
      password: Yup.string().min(6),
      pro: Yup.boolean()
    })

    if (!(await schema.isValid(user))) {
      return res.status(400).json({ message: 'Bad Request' })
    }

    try {
      const { email, password } = user
      const userFound = await UserLib.getExistentUser(email)

      if (!userFound) {
        return res.status(400).json({ message: 'User not found' })
      }

      if (password) {
        if (!userFound.checkPassword(password)) {
          return res.status(400).json({ message: 'Incorrect password' })
        }
      }

      const updatedUser = await User.findByIdAndUpdate(
        userFound._id,
        { ...user },
        { new: true }
      )
      return res.status(200).json(updatedUser)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ error: e })
    }
  }
}

module.exports = new UserController()
