const shell = require('shelljs');

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

const base_url =
  process.env.DEV === 'true'
    ? `http://${HOST}:${PORT}`
    : process.env.DEPLOY_URL;

let date = new Date();
let formated_date =
  date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

const new_treatment = {
  patientID: 1,
  startDate: formated_date,
  endDate: null,
  treatment_value: 500,
  number_installments: 5,
};

const treatment_without_patient = {
  startDate: formated_date,
  endDate: null,
  treatment_value: 500,
  number_installments: 5,
};

const treatment_without_value = {
  patientID: 1,
  startDate: formated_date,
  endDate: null,
  number_installments: 5,
};

const treatment_without_installments = {
  patientID: 1,
  startDate: formated_date,
  endDate: null,
  treatment_value: 500,
};

describe('# Treatment tests.', () => {
  describe('Creating treatments - Testing required fields.', () => {
    beforeEach(() => {
      shell.exec('cd ./backend && yarn sequelize-cli db:drop');
      shell.exec(
        'cd ./backend && yarn sequelize-cli db:create && yarn sequelize-cli db:migrate'
      );
    });

    it.skip('1/4 - It should be possible to add a new treatment.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'treatment',
        new_treatment
      );

      expect(frisby._response.status).toEqual(201);
      expect(frisby._json).toEqual(new_treatment);
    });

    it.skip('2/4 - It should not be possible to register a treatment without the patient.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'treatment',
        treatment_without_patient
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({ message: '"patientID" is required' });
    });

    it.skip('3/4 - It should not be possible to register a treatment without the value.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'treatment',
        treatment_without_value
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: '"treatment_value" is required',
      });
    });

    it.skip('4/4 - It should not be possible to register a treatment without the number of installments.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'treatment',
        treatment_without_installments
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: '"number_installments" is required',
      });
    });
  });
});
