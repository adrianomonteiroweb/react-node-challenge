const {
  addPaymentController,
} = require('../database/controllers/payments.controller');

const paymentRoutes = require('express').Router();

paymentRoutes.post('/payment', addPaymentController);

module.exports = paymentRoutes;
