const { CREATED, OK } = require('../../utils/statusCodesConstructor');
const { tryQueryServer } = require('../../utils/tryServer');
const {
  addTreatmentServer,
  updateTreatmentService,
  getTreatmentsService,
  getTreatmentByIDService,
  getTreatmentByPatientService,
} = require('../services/treatments.service');

const addTreatmentController = async (req, res, next) => {
  const result = await tryQueryServer(addTreatmentServer, [req.body], next);

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(CREATED).json(result);
};

const updateTreatmentController = async (req, res, next) => {
  const result = await tryQueryServer(
    updateTreatmentService,
    [req.params.id, req.body],
    next
  );

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

const getTreatmentsController = async (_req, res, next) => {
  const result = await tryQueryServer(getTreatmentsService, [], next);

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

const getTreatmentByIDController = async (req, res, next) => {
  const result = await tryQueryServer(
    getTreatmentByIDService,
    [req.params.id],
    next
  );

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

const getTreatmentByPatientController = async (req, res, next) => {
  const result = await tryQueryServer(
    getTreatmentByPatientService,
    [req.params.patientid],
    next
  );

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

module.exports = {
  addTreatmentController,
  updateTreatmentController,
  getTreatmentsController,
  getTreatmentByIDController,
  getTreatmentByPatientController,
};
