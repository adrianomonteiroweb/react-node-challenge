const { patients } = require('../models/index');

const addPatientService = async (
  firstName,
  lastName,
  email,
  number,
  describe
) => {
  const { firstName, lastName, email, number, describe } =
    await patients.create({
      firstName,
      lastName,
      email,
      number,
      describe,
    });

  return {
    firstName,
    lastName,
    email,
    number,
    describe,
  };
};

module.exports = { addPatientService };
