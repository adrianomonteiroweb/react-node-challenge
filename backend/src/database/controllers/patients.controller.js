const { CREATED, OK } = require('../../utils/statusCodesConstructor');
const { tryQueryServer } = require('../../utils/tryServer');
const {
  addPatientService,
  updatePatientService,
  getPatientsService,
  getPatientByIDService,
  getPatientByEmailService,
  deletePatientService,
} = require('../services/patientes.service');

const addPatientController = async (req, res, next) => {
  const result = await tryQueryServer(addPatientService, [req.body], next);

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(CREATED).json(result);
};

const updatePatientController = async (req, res, next) => {
  const result = await tryQueryServer(
    updatePatientService,
    [req.params.id, req.body],
    next
  );

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

const getPatientsController = async (_req, res, next) => {
  const result = await tryQueryServer(getPatientsService, [], next);

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

const getPatientByIDController = async (req, res, next) => {
  const result = await tryQueryServer(
    getPatientByIDService,
    [req.params.id],
    next
  );

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

const getPatientByEmailController = async (req, res, next) => {
  const result = await tryQueryServer(
    getPatientByEmailService,
    [req.body.email],
    next
  );

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

const deletePatientController = async (req, res, next) => {
  const result = await tryQueryServer(
    deletePatientService,
    [req.params.id],
    next
  );

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
