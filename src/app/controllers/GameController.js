const Game = require('../models/Game');


class GameController {
    async store(req, res) {
        try {

        } catch(e) {
            return res.status(500).json({ error: e});
        }
    }
    async index(req, res) {
        try {

        } catch(e) {
            return res.status(500).json({ error: e});
        }
    }
    async find(req, res) {
        try {

        } catch(e) {
            return res.status(500).json({ error: e});
        }
    }
    async update(req, res) {
        try {

        } catch(e) {
            return res.status(500).json({ error: e});
        }
    }
    async delete(req, res) {
        try {

        } catch(e) {
            return res.status(500).json({ error: e});
        }
    }
}

module.exports = new GameController();