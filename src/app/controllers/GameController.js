const Game = require('../models/Game');
const Yup = require('yup');

class GameController {
    async store(req, res) {
        const { body: game } = req;

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            picture_url: Yup.string().required()
        })

        if (!(await schema.isValid(game))) return res.status(400).json({ message: 'Bad Request' });
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

        const schema = Yup.object().shape({
            id: Yup.string().required(),
        })

        if (!(await schema.isValid(params))) return res.status(400).json({ message: 'Bad Request' });

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


        const schema = Yup.object().shape({
            _id: Yup.string().required(),
            name: Yup.string(),
            picture_url: Yup.string()
        })

        if (!(await schema.isValid(newGame))) return res.status(400).json({ message: 'Bad Request' });


        try {
            const gameFound = await Game.findById(newGame._id);

            if (!gameFound) return res.status(400).json({ message: 'Game not found' });

            const updatedGame = await Game.findByIdAndUpdate(newGame._id, { ...newGame }, { new: true });

            return res.status(200).json(updatedGame);

        } catch(e) {
            return res.status(500).json({ error: e});
        }
    }
    async delete(req, res) {
        const { params } = req;


        const schema = Yup.object().shape({
            id: Yup.string().required(),
        })

        if (!(await schema.isValid(params))) return res.status(400).json({ message: 'Bad Request' });

        try {
            const { id: _id } = params;

            const gameFound = await Game.findById(_id);
            
            if(!gameFound) return res.status(400).json({ message: 'Game not found' });
            
            await Game.deleteOne({ _id });
            return res.status(200).json({ message: 'Game was deleted' });
        } catch(e) {
            console.log(e);
            return res.status(500).json({ error: e});
        }
    }
}

module.exports = new GameController(); 