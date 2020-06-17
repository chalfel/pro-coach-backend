const { Router } = require('express');

const multerConfig = require('../config/multer');
const multer = require('multer');
const FileController = require('../controllers/FileController');

const routes = Router();
const upload = multer(multerConfig);


routes.post('/file', upload.single('file'), FileController.store);

module.exports = routes;
