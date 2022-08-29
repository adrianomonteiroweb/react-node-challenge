const {
  addPatientController,
  updatePatientController,
  getPatientsController,
  getPatientByIDController,
} = require('../database/controllers/patients.controller');

const patientRoutes = require('express').Router();

patientRoutes.post('/patient', addPatientController);

patientRoutes.put('/patient/:id', updatePatientController);

patientRoutes.get('/patient', getPatientsController);

patientRoutes.get('/patient/:id', getPatientByIDController);

patientRoutes.put('/patient/email');

module.exports = patientRoutes;
