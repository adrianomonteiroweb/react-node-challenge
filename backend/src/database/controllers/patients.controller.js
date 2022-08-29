const { CREATED, OK } = require('../../utils/statusCodesConstructor');
const {
  addPatientService,
  updatePatientService,
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

module.exports = { addPatientController, updatePatientController };
