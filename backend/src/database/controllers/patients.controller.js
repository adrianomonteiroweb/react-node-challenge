const { CREATED } = require('../../utils/statusCodesConstructor');
const { addPatientService } = require('../services/patientes.service');

const addPatientController = async (req, res, next) => {
  try {
    const result = await addPatientService(req.body);

    return res.status(CREATED).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = { addPatientController };
