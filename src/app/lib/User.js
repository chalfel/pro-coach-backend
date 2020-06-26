const User = require('../models/User')
const Yup = require('yup')

class UserLib {
  async getExistentUser(email) {
    try {
      const user = await User.findOne({ email })
      return user
    } catch (e) {
      return e
    }
  }

  validateUserEmail(params) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required()
    })
    return schema.isValid(params)
  }
}

module.exports = new UserLib()
