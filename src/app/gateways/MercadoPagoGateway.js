const mercadoPago = require('mercadopago');
const mercadoPagoConfig = require('../config/mercadoPago');

mercadoPago.configure(mercadoPagoConfig);

console.log(mercadoPago.payment);