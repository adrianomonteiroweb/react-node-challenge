const {
  addPaymentController,
  updatePaymentController,
} = require('../database/controllers/payments.controller');

const paymentRoutes = require('express').Router();

paymentRoutes.post('/payment', addPaymentController);

paymentRoutes.put('/payment/:id', updatePaymentController);

module.exports = paymentRoutes;
