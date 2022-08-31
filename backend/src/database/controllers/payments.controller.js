const { CREATED, OK } = require('../../utils/statusCodesConstructor');
const { tryQueryServer } = require('../../utils/tryServer');
const {
  addPaymentServer,
  updatePaymentService,
  getPaymentsService,
  getPaymentByIDService,
  getPaymentByPatientService,
} = require('../services/payments.service');

const addPaymentController = async (req, res, next) => {
  const result = await tryQueryServer(addPaymentServer, [req.body], next);

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(CREATED).json(result);
};

const updatePaymentController = async (req, res, next) => {
  const result = await tryQueryServer(
    updatePaymentService,
    [req.params.id, req.body],
    next
  );

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

const getPaymentsController = async (_req, res, next) => {
  const result = await tryQueryServer(getPaymentsService, [], next);

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

const getPaymentByIDController = async (req, res, next) => {
  const result = await tryQueryServer(
    getPaymentByIDService,
    [req.params.id],
    next
  );

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

const getPaymentByPatientController = async (req, res, next) => {
  const result = await tryQueryServer(
    getPaymentByPatientService,
    [req.params.patientid],
    next
  );

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

module.exports = {
  addPaymentController,
  updatePaymentController,
  getPaymentsController,
  getPaymentByIDController,
  getPaymentByPatientController,
};
