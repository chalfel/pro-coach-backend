const Order = require('../models/Order');


class OrderController {

    async index(req, res) {
        try {
            const orders = await Order.find({});

            return res.status(200).json(orders);
        } catch(e) {
            return res.status(500).json({ error: e })
        }
    }

    async store(req, res) {
        const { body: order } = req;

        try {
            const newOrder = await Order.create(order);

            return res.status(200).json(newOrder);

        } catch(e) {
            return res.status(500).json({ error: e })
        }
    }

    async search(req, res) {
        const { params } = req;

        try {
            const { id } = params;

            const foundOrder = await Order.findById(id);

            return res.status(200).json(foundOrder);

        } catch(e) {
            return res.status(500).json({ error: e })
        }
    }

    async delete(req, res) {
        const { params } = req;

        try {
            const { id } = params;
            
            await Order.findByIdAndDelete(id);

            return res.status(200).json({ message: 'Order was deleted' })
            
        } catch(e) {
            return res.status(500).json({ error: e })
        }
    }
    
    async update(req, res) {
        const { body: newOrder } = req;
        
        try {
            const updatedOrder = await Order.findByIdAndUpdate(newOrder._id, newOrder, { new: true });

            return res.status(200).json(updatedOrder);
            
        } catch(e) {
            return res.status(500).json({ error: e })
        }
    }

}


module.exports = new OrderController(); 