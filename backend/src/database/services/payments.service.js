const {
  errorMessageConstructor,
} = require('../../utils/errorMessageConstructor');
const { BAD_REQUEST } = require('../../utils/statusCodesConstructor');
const { payments } = require('../models/index');
const { paymentSchema } = require('../schemas');

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

module.exports = { addPaymentServer };
