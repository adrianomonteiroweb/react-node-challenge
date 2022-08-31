const {
  errorMessageConstructor,
} = require('../../utils/errorMessageConstructor');
const { treatmentSchema, treatmentUpdateSchema } = require('../schemas');
const { treatments } = require('../models/index');
const { BAD_REQUEST } = require('../../utils/statusCodesConstructor');

const addTreatmentServer = async (body) => {
  const { error } = treatmentSchema.validate(body);

  if (error) return errorMessageConstructor(BAD_REQUEST, error.message);

  const {
    patientID,
    startDate,
    endDate,
    treatment_value,
    number_installments,
  } = body;

  let created;

  try {
    created = await treatments.create({
      patientID,
      startDate,
      endDate,
      treatment_value,
      number_installments,
    });
  } catch (error) {
    console.error(error);
  }

  return {
    patientID: created.patientID,
    startDate: created.startDate.toString(),
    endDate: created.endDate,
    treatment_value: created.treatment_value,
    number_installments: created.number_installments,
  };
};

const updateTreatmentService = async (id, body) => {
  const { error } = treatmentUpdateSchema.validate(body);

  if (error) return errorMessageConstructor(BAD_REQUEST, error.message);

  const updated = await treatments.update(body, {
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

const getTreatmentsService = async () => {
  let allTreatments = await treatments.findAll();

  return allTreatments.length < 1
    ? errorMessageConstructor(
        BAD_REQUEST,
        'It was not possible to search all treatments.'
      )
    : allTreatments;
};

const getTreatmentByIDService = async (id) => {
  const treatmentByID = await treatments.findByPk(id);

  return !treatmentByID
    ? errorMessageConstructor(
        BAD_REQUEST,
        'Error trying to find treatment with non-existent ID.'
      )
    : treatmentByID;
};

const getTreatmentByPatientService = async (patientID) => {
  const treatmentByPatient = await treatments.findOne({
    where: { patientID },
  });

  return !treatmentByPatient
    ? errorMessageConstructor(
        BAD_REQUEST,
        'Error trying to find treatment with non-existent patient.'
      )
    : treatmentByPatient;
};

module.exports = {
  addTreatmentServer,
  updateTreatmentService,
  getTreatmentsService,
  getTreatmentByIDService,
  getTreatmentByPatientService,
};
