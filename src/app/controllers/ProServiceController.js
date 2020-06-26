const ProService = require('../models/ProService')
const Game = require('../models/Game')
const User = require('../models/User')
const Yup = require('yup')

class ProServiceController {
  async store(req, res) {
    const { body: proService } = req

    const schema = Yup.object().shape({
      image: Yup.string(),
      name: Yup.string().required(),
      description: Yup.string(),
      user: Yup.string().required(),
      price: Yup.number().required(),
      rating: Yup.string(),
      active: Yup.boolean().required(),
      comments: Yup.array(),
      game: Yup.string().required()
    })

    if (!(await schema.isValid(proService))) {
      return res.status(400).json({ message: 'Bad Request' })
    }
    try {
      const gameFound = await Game.findById(proService.game)
      const userFound = await User.findById(proService.user)

      if (!gameFound) return res.status(400).json({ message: 'Game not found' })
      if (!userFound) return res.status(400).json({ message: 'User not found' })

      if (!userFound.pro) {
        return res.status(403).json({ message: 'User was not allowed' })
      }

      const newProService = await ProService.create(proService)

      return res.status(200).json(newProService)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ error: e })
    }
  }

  async index(req, res) {
    try {
      const proServices = await ProService.find({})
      return res.status(200).json(proServices)
    } catch (e) {
      return res.status(500).json({ error: e })
    }
  }

  async search(req, res) {
    const { params } = req
    const schema = Yup.object().shape({
      id: Yup.string().required()
    })

    if (!(await schema.isValid(params))) {
      return res.status(400).json({ message: 'Bad Request' })
    }

    try {
      const { id } = params
      const proService = await ProService.findById(id)

      return res.status(200).json(proService)
    } catch (e) {
      return res.status(500).json({ error: e })
    }
  }

  async update(req, res) {
    const { body } = req

    const schema = Yup.object().shape({
      _id: Yup.string(),
      image: Yup.string(),
      name: Yup.string(),
      description: Yup.string(),
      user: Yup.string(),
      price: Yup.number(),
      rating: Yup.string(),
      active: Yup.boolean(),
      comments: Yup.array(),
      game: Yup.string()
    })

    if (!(await schema.isValid(body))) {
      return res.status(400).json({ message: 'Bad Request' })
    }

    try {
      const userFound = await User.findById(body.user)
      if (!userFound || !userFound.pro) {
        return res.status(400).json({ message: 'Pro player not Found' })
      }

      const newProService = await ProService.findByIdAndUpdate(
        body._id,
        { ...body },
        { new: true }
      )

      return res.status(200).json(newProService)
    } catch (e) {
      return res.status(500).json({ error: e })
    }
  }

  async delete(req, res) {
    const { params } = req
    const schema = Yup.object().shape({
      id: Yup.string().required()
    })

    if (!(await schema.isValid(params))) {
      return res.status(400).json({ message: 'Bad Request' })
    }

    try {
      const { id } = req.params
      await ProService.deleteOne({ _id: id })

      return res.status(200).json({ message: 'Service was deleted' })
    } catch (e) {
      return res.status(500).json({ error: e })
    }
  }
}

module.exports = new ProServiceController()
