const {
  addTreatmentController,
} = require('../database/controllers/treatments.controller');

const treatmentRoutes = require('express').Router();

treatmentRoutes.post('/treatment', addTreatmentController);

module.exports = treatmentRoutes;
