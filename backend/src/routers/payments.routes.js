const {
  addPaymentController,
  updatePaymentController,
  getPaymentsController,
  getPaymentByIDController,
  getPaymentByPatientController,
} = require('../database/controllers/payments.controller');

const paymentRoutes = require('express').Router();

paymentRoutes.post('/payment', addPaymentController);

paymentRoutes.put('/payment/:id', updatePaymentController);

paymentRoutes.get('/payment', getPaymentsController);

paymentRoutes.get('/payment/:id', getPaymentByIDController);

paymentRoutes.get('/payment/patient/:patientid', getPaymentByPatientController);

module.exports = paymentRoutes;
