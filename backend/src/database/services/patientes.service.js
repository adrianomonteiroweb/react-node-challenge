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

const getPatientsService = async () => {
  const allPatients = await patients.findAll();

  return allPatients.length < 1
    ? errorMessageConstructor(
        BAD_REQUEST,
        'It was not possible to search all patients.'
      )
    : allPatients;
};

const getPatientByIDService = async (id) => {
  const patientByID = await patients.findByPk(id);

  return !patientByID
    ? errorMessageConstructor(
        BAD_REQUEST,
        'Error trying to find patient with non-existent ID.'
      )
    : patientByID;
};

const getPatientByEmailService = async (email) => {
  const patientByEmail = await patients.findOne({
    where: { email },
  });

  return !patientByEmail
    ? errorMessageConstructor(
        BAD_REQUEST,
        'Error trying to find patient with non-existent email.'
      )
    : patientByEmail;
};

module.exports = {
  addPatientService,
  updatePatientService,
  getPatientsService,
  getPatientByIDService,
  getPatientByEmailService,
};
