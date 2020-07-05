const Order = require('../models/Order')
const MercadoPagoGateway = require('../gateways/MercadoPagoGateway')
const responseHandler = require('../handlers/response')

class PaymentController {
  async success(req, res) {
    const { query: data } = req
    try {
      const { collection_id: collectionId, external_reference: orderId } = data
      const payment = await MercadoPagoGateway.search(collectionId)

      if (!payment) return responseHandler.notFound(res, 'Payment not Found')

      await Order.findByIdAndUpdate(
        JSON.parse(orderId),
        { payment_status: 'paid', payment_method: data.payment_type },
        { new: true }
      )
      const html = `
        <html>
          <head>
            <title>success</title>
          </head>
        </html>
      `
      return res.status(200).send(html)
    } catch (e) {
      return responseHandler.error(res, e.message)
    }
  }

  async failure(req, res) {
    const { query: data } = req

    try {
      const { collection_id: collectionId, external_reference: orderId } = data
      const payment = await MercadoPagoGateway.search(collectionId)

      if (!payment) return responseHandler.notFound(res, 'Payment not Found')
      const updatedOrder = await Order.findByIdAndUpdate(
        JSON.parse(orderId),
        { payment_status: 'failure' },
        { new: true }
      )

      return responseHandler.success(res, updatedOrder)
    } catch (e) {
      return responseHandler.error(res, e.message)
    }
  }

  async refund(req, res) {
    const { query: data } = req
    try {
      const { collection_id: collectionId, external_reference: orderId } = data

      const refound = await MercadoPagoGateway.refound(collectionId)

      if (!refound) {
        return res.status(200).send({ message: 'Houve um erro na devolução' })
      }

      const refoundedOrder = await Order.findByIdAndUpdate(
        orderId,
        { payment_status: 'refound' },
        { new: true }
      )

      return responseHandler.success(res, refoundedOrder)
    } catch (e) {
      return responseHandler.error(res, e.message)
    }
  }

  async pending(req, res) {
    const { query: data } = req

    try {
      const { collection_id: collectionId, external_reference: orderId } = data
      const payment = await MercadoPagoGateway.search(collectionId)

      if (!payment) return responseHandler.notFound(res, 'Payment not Found')
      const updatedOrder = await Order.findByIdAndUpdate(
        JSON.parse(orderId),
        { payment_status: 'pending' },
        { new: true }
      )

      return responseHandler.success(res, updatedOrder)
    } catch (e) {
      return responseHandler.error(res, e.message)
    }
  }
}

module.exports = new PaymentController()
