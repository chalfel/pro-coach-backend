const ProService = require('../models/ProService');
const Game = require('../models/Game');
const User = require('../models/User');


class ProServiceController {
    async store(req, res) {
        const { body: proService } = req;
        try {
            const newProService = await ProService.create(proService);

            return res.status(200).json(newProService);
        } catch(e) {
            return res.status(500).json({ error: e});
        }
    }
    async index(req, res) {
        try {

            const proServices = await ProService.find({})
            return res.status(200).json(proServices);
        } catch(e) {
            return res.status(500).json({ error: e });
        }
    }
    async search(req, res) {
        const { id } = req.params;
        try {
            const proService = await ProService.findById(id);

            return res.status(200).json(proService);
        } catch(e) {
            return res.status(500).json({ error: e});
        }
    }
    async update(req, res) {
        const { body } = req;
        try {
            const newProService = await ProService.findByIdAndUpdate(body.id, {...body}, { new: true});

            return res.status(200).json(newProService);

        } catch(e) {
            return res.status(500).json({ error: e});
        }
    }
    async delete(req, res) {
        const { id } = req.params;
        try {
            await ProService.deleteOne({ _id: id });
            
            return res.status(200).json({ message: 'Service was deleted' })
        } catch(e) {
            return res.status(500).json({ error: e});
        }
    }
}

module.exports = new ProServiceController();