const { CREATED, OK } = require('../../utils/statusCodesConstructor');
const {
  addPatientService,
  updatePatientService,
  getPatientsService,
  getPatientByIDService,
  getPatientByEmailService,
  deletePatientService,
} = require('../services/patientes.service');

const addPatientController = async (req, res, next) => {
  let result;

  try {
    result = await addPatientService(req.body);
  } catch (error) {
    console.error(error.message);
    next(error);
  }

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(CREATED).json(result);
};

const updatePatientController = async (req, res, next) => {
  let result;

  try {
    result = await updatePatientService(req.params.id, req.body);
  } catch (error) {
    console.error(error.message);
    next(error);
  }

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

const getPatientsController = async (_req, res, next) => {
  let result;

  try {
    result = await getPatientsService();
  } catch (error) {
    console.error(error.message);
    next(error);
  }

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

const getPatientByIDController = async (req, res, next) => {
  let result;

  try {
    result = await getPatientByIDService(req.params.id);
  } catch (error) {
    console.error(error.message);
    next(error);
  }

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

const getPatientByEmailController = async (req, res, next) => {
  let result;

  try {
    result = await getPatientByEmailService(req.body.email);
  } catch (error) {
    console.error(error.message);
    next(error);
  }

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

const deletePatientController = async (req, res, next) => {
  let result;

  try {
    result = await deletePatientService(req.params.id);
  } catch (error) {
    console.error(error.message);
    next(error);
  }

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

module.exports = {
  addPatientController,
  updatePatientController,
  getPatientsController,
  getPatientByIDController,
  getPatientByEmailController,
  deletePatientController,
};
