const Game = require('../models/Game');


class GameController {
    async store(req, res) {
        const { body: game } = req;
        try {
            const newGame = await Game.create(game);

            return res.status(200).json(newGame);

        } catch(e) {
            return res.status(500).json({ error: e});
        }
    }
    async index(req, res) {
        try {
            const games = await Game.find({});

            return res.status(200).json(games);

        } catch(e) {
            return res.status(500).json({ error: e});
        }
    }
    async search(req, res) {
        const { params } = req;
        try {
            const { id } = params;
            const game = await Game.findById(id);

            return res.status(200).json(game);
        } catch(e) {
            return res.status(500).json({ error: e});
        }
    }
    async update(req, res) {
        const { body: newGame } = req;
        try {
            const updatedGame = await Game.findByIdAndUpdate(newGame.id, { ...newGame }, { new: true });

            return res.status(200).json(updatedGame);

        } catch(e) {
            return res.status(500).json({ error: e});
        }
    }
    async delete(req, res) {
        const { params } = req;
        try {
            const { id: _id } = params;

            await Game.deleteOne({ _id });

            return res.status(200).json({ message: 'Game was deleted' });
        } catch(e) {
            return res.status(500).json({ error: e});
        }
    }
}

module.exports = new GameController();