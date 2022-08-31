const Joi = require('joi');

exports.patientSchema = Joi.object({
  firstName: Joi.required(),
  lastName: Joi.required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  number: Joi.string().min(11).required(),
  describe: Joi.optional(),
});

exports.treatmentSchema = Joi.object({
  patientID: Joi.number().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().optional(),
  treatment_value: Joi.number().required(),
  number_installments: Joi.number().required(),
});
