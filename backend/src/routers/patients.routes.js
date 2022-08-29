const {
  addPatientController,
  updatePatientController,
  getPatientsController,
} = require('../database/controllers/patients.controller');

const patientRoutes = require('express').Router();

patientRoutes.post('/patient', addPatientController);

patientRoutes.put('/patient/:id', updatePatientController);

patientRoutes.get('/patient', getPatientsController);

patientRoutes.get('/patient/:id');

patientRoutes.put('/patient/email');

module.exports = patientRoutes;
