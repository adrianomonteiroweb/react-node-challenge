const {
  errorMessageConstructor,
} = require('../../utils/errorMessageConstructor');
const { BAD_REQUEST } = require('../../utils/statusCodesConstructor');
const { payments } = require('../models/index');
const { paymentSchema, paymentUpdateSchema } = require('../schemas');

const addPaymentServer = async (body) => {
  const { error } = paymentSchema.validate(body);

  if (error) return errorMessageConstructor(BAD_REQUEST, error.message);

  const { patientID, treatmentID, paymentDate, installment } = body;

  let created;

  try {
    created = await payments.create({
      patientID,
      treatmentID,
      paymentDate,
      installment,
    });
  } catch (error) {
    console.error(error);
  }

  return {
    patientID: created.patientID,
    treatmentID: created.treatmentID,
    paymentDate: created.paymentDate,
    installment: created.installment,
  };
};

const updatePaymentService = async (id, body) => {
  const { error } = paymentUpdateSchema.validate(body);

  if (error) return errorMessageConstructor(BAD_REQUEST, error.message);

  const updated = await payments.update(body, {
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

const getPaymentsService = async () => {
  let allPayments = await payments.findAll();

  return allPayments.length < 1
    ? errorMessageConstructor(
        BAD_REQUEST,
        'It was not possible to search all payments.'
      )
    : allPayments;
};

const getPaymentByIDService = async (id) => {
  const paymentByID = await payments.findByPk(id);

  return !paymentByID
    ? errorMessageConstructor(
        BAD_REQUEST,
        'Error trying to find payment with non-existent ID.'
      )
    : paymentByID;
};

const getPaymentByPatientService = async (patientID) => {
  const paymentByPatient = await payments.findOne({
    where: { patientID },
  });

  return !paymentByPatient
    ? errorMessageConstructor(
        BAD_REQUEST,
        'Error trying to find payment with non-existent patient.'
      )
    : paymentByPatient;
};

module.exports = {
  addPaymentServer,
  updatePaymentService,
  getPaymentsService,
  getPaymentByIDService,
  getPaymentByPatientService,
};
