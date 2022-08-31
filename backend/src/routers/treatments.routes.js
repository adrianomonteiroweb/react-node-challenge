const {
  addTreatmentController,
  updateTreatmentController,
} = require('../database/controllers/treatments.controller');

const treatmentRoutes = require('express').Router();

treatmentRoutes.post('/treatment', addTreatmentController);

treatmentRoutes.put('/treatment/:id', updateTreatmentController);

module.exports = treatmentRoutes;
