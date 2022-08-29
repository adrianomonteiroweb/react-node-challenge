const {
  errorMessageConstructor,
} = require('../../utils/errorMessageConstructor');
const { BAD_REQUEST } = require('../../utils/statusCodesConstructor');
const { patients } = require('../models/index');
const { patientSchema } = require('../schemas');

const addPatientService = async (body) => {
  const { error } = patientSchema.validate(body);

  if (error) return errorMessageConstructor(BAD_REQUEST, error.message);

  const { firstName, lastName, email, number, describe } = body;

  const created = await patients.create({
    firstName,
    lastName,
    email,
    number,
    describe,
  });

  return {
    firstName: created.firstName,
    lastName: created.lastName,
    email: created.email,
    number: created.number,
    describe: created.describe,
  };
};

const updatePatientService = async (id, body) => {
  const { error } = patientSchema.validate(body);

  if (error) return errorMessageConstructor(BAD_REQUEST, error.message);

  const updated = await patients.update(body, {
    where: {
      id,
    },
  });

  return updated[0] < 1
    ? errorMessageConstructor(
        BAD_REQUEST,
        'Error trying to update by wrong ID.'
      )
    : updated;
};

module.exports = { addPatientService, updatePatientService };
