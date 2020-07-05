const jwt = require('jsonwebtoken')
const Yup = require('yup')
const responseHandler = require('../handlers/response')
const UserLib = require('../lib/User')

class SessionController {
  async createSession(req, res) {
    const { body } = req

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    })

    if (!(await schema.isValid(body))) {
      return res.status(400).json({ message: 'Bad Request' })
    }

    const { email, password } = body

    const user = await UserLib.getExistentUser(email)

    try {
      if (!user) {
        return res.status(400).json({ message: 'User not found' })
      }
      if (!user.checkPassword(password)) {
        return res.status(400).json({ message: 'Incorrect password' })
      }
      const {
        _id: id,
        username,
        email,
        discord,
        skype,
        name,
        pro,
        imgUrl
      } = user
      const token = jwt.sign({ id, email, username, pro }, process.env.SECRET, {
        expiresIn: process.env.EXPIRE_TIME
      })
      return res.status(200).json({
        token,
        user: {
          username,
          email,
          discord,
          skype,
          name,
          pro,
          imgUrl
        }
      })
    } catch (e) {
      console.log(e)
      return res.status(500).json({ error: e })
    }
  }

  async restoreSession(req, res) {
    const { authorization } = req.headers
    try {
      const token = authorization.split('authorization ')[1]
      const { email } = await jwt.decode(token)
      const userFound = await UserLib.getExistentUser(email)
      if (!userFound) {
        return responseHandler.notFound(res, { message: 'User not found' })
      }
      userFound.password_hash = undefined
      return responseHandler.success(res, userFound)
    } catch (e) {
      return responseHandler.error(res, e)
    }
  }
}

module.exports = new SessionController()
