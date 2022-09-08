const Joi = require('joi');

exports.userSchema = Joi.object({
  firstName: Joi.required(),
  lastName: Joi.required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password_hash: Joi.string().min(8).required(),
  number: Joi.string().min(11).required(),
  role: Joi.string(),
});

exports.loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password_hash: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
    .required(),
});

exports.treatmentSchema = Joi.object({
  patientID: Joi.number().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().optional(),
  treatment_value: Joi.number().required(),
  number_installments: Joi.number().required(),
});

exports.treatmentUpdateSchema = Joi.object({
  endDate: Joi.date().optional(),
  treatment_value: Joi.number().optional(),
  number_installments: Joi.number().optional(),
});

exports.paymentSchema = Joi.object({
  patientID: Joi.number().required(),
  treatmentID: Joi.number().required(),
  paymentDate: Joi.date().required(),
  installment: Joi.number().required(),
});

exports.paymentUpdateSchema = Joi.object({
  paymentDate: Joi.date().optional(),
  installment: Joi.number().optional(),
});
