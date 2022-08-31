const {
  addTreatmentController,
  updateTreatmentController,
  getTreatmentsController,
  getTreatmentByIDController,
  getTreatmentByPatientController,
} = require('../database/controllers/treatments.controller');

const treatmentRoutes = require('express').Router();

treatmentRoutes.post('/treatment', addTreatmentController);

treatmentRoutes.put('/treatment/:id', updateTreatmentController);

treatmentRoutes.get('/treatment', getTreatmentsController);

treatmentRoutes.get('/treatment/:id', getTreatmentByIDController);

treatmentRoutes.get(
  '/treatment/patient/:patientid',
  getTreatmentByPatientController
);

module.exports = treatmentRoutes;
