const { CREATED } = require('../../utils/statusCodesConstructor');
const { addPatientService } = require('../services/patientes.service');

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

module.exports = { addPatientController };
