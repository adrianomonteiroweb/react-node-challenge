const {
  addPatientController,
  updatePatientController,
} = require('../database/controllers/patients.controller');

const patientRoutes = require('express').Router();

patientRoutes.post('/patient', addPatientController);

patientRoutes.put('/patient/:id', updatePatientController);

module.exports = patientRoutes;
