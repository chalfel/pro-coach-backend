const Order = require('../models/Order')
const User = require('../models/User')
const ProService = require('../models/ProService')

const responseHandler = require('../handlers/response')
const ValidateLib = require('../lib/Validate')
const Yup = require('yup')
const MercadoPagoGateway = require('../gateways/MercadoPagoGateway')

class OrderController {
  async index(req, res) {
    try {
      const orders = await Order.find({})

      return responseHandler.success(res, orders)
    } catch (e) {
      return responseHandler.error(res, e)
    }
  }

  async store(req, res) {
    const { body: order } = req
    console.log(order)
    const schema = Yup.object().shape({
      user: Yup.string().required(),
      proService: Yup.string().required(),
      price: Yup.number().required(),
      payment_method: Yup.string(),
      payment_status: Yup.string()
    })

    if (!(await schema.isValid(order))) return responseHandler.badRequest(res)

    try {
      const proServiceFound = await ValidateLib.hasOne(
        ProService,
        order.proService
      )

      if (!proServiceFound) {
        return responseHandler.notFound(res, 'Pro Service not found')
      }

      const userFound = await ValidateLib.hasOne(User, order.user)

      if (!userFound) return responseHandler.notFound(res, 'User not Found')

      const newOrder = await Order.create(order)

      const checkoutInfo = {
        id: proServiceFound._id,
        orderId: newOrder._id,
        name: proServiceFound.name,
        description: proServiceFound.description,
        price: order.price,
        email: userFound.email
      }
      const checkoutResult = await MercadoPagoGateway.checkout(
        checkoutInfo,
        req
      )
      return res.status(200).json({ uri: `${checkoutResult.body.init_point}` })
    } catch (e) {
      console.log(e)
      return responseHandler.error(res, e)
    }
  }

  async search(req, res) {
    const { params } = req

    const schema = Yup.object().shape({
      id: Yup.string().required()
    })

    if (!(await schema.isValid(params))) {
      return responseHandler.badRequest(res)
    }

    try {
      const { id } = params

      const foundOrder = await Order.findById(id)

      return responseHandler.success(foundOrder)
    } catch (e) {
      return responseHandler.error(res, e)
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
      const { id } = params

      const orderFound = await Order.findById(id)

      if (!orderFound) {
        return res.status(400).json({ message: 'Order not Found' })
      }

      await Order.findByIdAndDelete(id)

      return res.status(200).json({ message: 'Order was deleted' })
    } catch (e) {
      return res.status(500).json({ error: e })
    }
  }

  async update(req, res) {
    const { body: newOrder } = req
    const schema = Yup.object().shape({
      _id: Yup.string().required(),
      user: Yup.string(),
      proService: Yup.string(),
      price: Yup.number(),
      payment_method: Yup.string(),
      payment_status: Yup.string(),
      status: Yup.string()
    })
    if (!(await schema.isValid(newOrder))) {
      return res.status(400).json({ message: 'Bad Request' })
    }

    try {
      const { proService, user } = newOrder

      if (proService) {
        const proServiceFound = await ValidateLib.hasOne(
          ProService,
          newOrder.proService
        )

        if (!proServiceFound) {
          return res.status(400).json({ message: 'Pro Service not found' })
        }
      }

      if (user) {
        const userFound = await ValidateLib.hasOne(ProService, newOrder.user)

        if (!userFound) {
          return res.status(400).json({ message: 'User not found' })
        }
      }
      const orderFound = await Order.findById(newOrder._id)

      if (!orderFound) {
        return res.status(400).json({ message: 'Order not Found' })
      }

      const updatedOrder = await Order.findByIdAndUpdate(
        newOrder._id,
        newOrder,
        { new: true }
      )

      return res.status(200).json(updatedOrder)
    } catch (e) {
      return res.status(500).json({ error: e })
    }
  }
}

module.exports = new OrderController()
