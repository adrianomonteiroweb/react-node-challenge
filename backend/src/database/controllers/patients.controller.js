const { CREATED } = require('../../utils/statusCodesConstructor');

const addPatientController = async (req, res, next) => {
  try {
    const { firstName, lastName, email, number, describe } = req.body;

    const result = await addPatientService(
      firstName,
      lastName,
      email,
      number,
      describe
    );

    return res.status(CREATED).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = { addPatientController };
