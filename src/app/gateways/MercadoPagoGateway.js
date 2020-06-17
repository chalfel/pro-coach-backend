const MercadoPago = require('mercadopago');
const mercadoPagoConfig = require('../config/mercadoPago');
const UrlLib = require('../lib/Url');

class MercadoPagoGateway {
    constructor(){
        MercadoPago.configure(mercadoPagoConfig)
    }

    checkout(checkoutInfo, req) {
        const purchaseOrder = {
            items: [
              {
                id: checkoutInfo.id,
                title: checkoutInfo.name,
                description : checkoutInfo.description,
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(checkoutInfo.price)
              }
            ],
            payer : {
              email: checkoutInfo.email
            },
            auto_return : "all",
            external_reference : JSON.stringify(checkoutInfo.id),
            back_urls : {
              success : UrlLib.getFullUrl(req) + "/payments/success",
              pending : UrlLib.getFullUrl(req) + "/payments/pending",
              failure : UrlLib.getFullUrl(req) + "/payments/failure",
            }
          }
      
          //Generate init_point to checkout
          try {
            return MercadoPago.preferences.create(purchaseOrder);
          }catch(err){
            return err.message;
          }
    }
}

module.exports = new MercadoPagoGateway();