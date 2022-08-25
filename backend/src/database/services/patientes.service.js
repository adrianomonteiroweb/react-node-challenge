const { patients } = require('../models/index');

const addPatientService = async (body) => {
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

module.exports = { addPatientService };
