const {
  addPatientController,
} = require('../database/controllers/patients.controller');

const patientRoutes = require('express').Router();

patientRoutes.post('/patient', addPatientController);

module.exports = patientRoutes;
