const { CREATED, OK } = require('../../utils/statusCodesConstructor');
const { tryQueryServer } = require('../../utils/tryServer');
const {
  addTreatmentServer,
  updateTreatmentService,
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

module.exports = {
  addTreatmentController,
  updateTreatmentController,
};
