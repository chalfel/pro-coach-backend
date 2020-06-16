const { response } = require('express');

const badRequest = (res, missingParams) => res.status(400).json({ message: 'Bad Request', missingParams }) 
const success = (res, data) => res.status(200).json(data); 
const forbbiden = (res) => res.status(403).json({ message: 'Forbidden Access' }) 
const notFound = (res, message) => res.status(404).json({ message }) 
const error = (res, error) => res.status(500).json(error); 

module.exports = {
    badRequest,
    success,
    forbbiden,
    notFound,
    error,
}