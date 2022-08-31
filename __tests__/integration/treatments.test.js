const shell = require('shelljs');

const {
  frisbyPostFunction,
  frisbyPutFunction,
  frisbyGetFunction,
} = require('../functions/frisbyFunctions');

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

const base_url =
  process.env.DEV === 'true'
    ? `http://${HOST}:${PORT}`
    : process.env.DEPLOY_URL;

let formated_date = new Date();

const new_treatment = {
  patientID: 1,
  startDate: formated_date,
  treatment_value: 500,
  number_installments: 5,
};

const new_treatment2 = {
  patientID: 2,
  startDate: formated_date,
  treatment_value: 1000,
  number_installments: 10,
};

const treatment_without_patient = {
  startDate: formated_date,
  treatment_value: 500,
  number_installments: 5,
};

const treatment_without_value = {
  patientID: 1,
  startDate: formated_date,
  number_installments: 5,
};

const treatment_without_installments = {
  patientID: 1,
  startDate: formated_date,
  treatment_value: 500,
};

const treatment_updated_value = {
  treatment_value: 500,
  number_installments: 10,
};

const treatment_updated_end_date = {
  endDate: `${new Date('5/12/222')}`,
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

  describe('Updating treatments.', () => {
    beforeEach(() => {
      shell.exec('cd ./backend && yarn sequelize-cli db:drop');
      shell.exec(
        'cd ./backend && yarn sequelize-cli db:create && yarn sequelize-cli db:migrate'
      );
    });

    it.skip('1/3 - It should be possible to update a treatment successfully.', async () => {
      await frisbyPostFunction(base_url, 'treatment', new_treatment);

      const frisby = await frisbyPutFunction(
        base_url,
        'treatment/1',
        treatment_updated_value
      );

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json).toEqual([1]);
    });

    it.skip('2/3 - It should be possible to update a treatment successfully.', async () => {
      await frisbyPostFunction(base_url, 'treatment', new_treatment);

      const frisby = await frisbyPutFunction(
        base_url,
        'treatment/1',
        treatment_updated_end_date
      );

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json).toEqual([1]);
    });

    it.skip('3/3 - It should not be possible to update a patient with a non-existent ID.', async () => {
      await frisbyPostFunction(base_url, 'treatment', new_treatment);

      const frisby = await frisbyPutFunction(
        base_url,
        'treatment/2',
        treatment_updated_value
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: 'Error trying to update by wrong ID.',
      });
    });
  });

  describe('Gettings treatments.', () => {
    beforeEach(() => {
      shell.exec('cd ./backend && yarn sequelize-cli db:drop');
      shell.exec(
        'cd ./backend && yarn sequelize-cli db:create && yarn sequelize-cli db:migrate'
      );
    });

    it.skip('1/5 - It must be possible to search for all treatments.', async () => {
      await frisbyPostFunction(base_url, 'treatment', new_treatment);
      await frisbyPostFunction(base_url, 'treatment', new_treatment2);

      const frisby = await frisbyGetFunction(base_url, 'treatment');

      frisby._json.map((treatment) => {
        treatment['startDate'] = new Date(`${treatment.startDate}`);
      });

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json.length).toBe(2);
      expect(frisby._json[0].patientID).toBe(new_treatment.patientID);
      expect(frisby._json[1].patientID).toBe(new_treatment2.patientID);
    });

    it.skip('2/5 - It must be possible to search for a treatment by ID..', async () => {
      await frisbyPostFunction(base_url, 'treatment', new_treatment);
      await frisbyPostFunction(base_url, 'treatment', new_treatment2);

      const frisby = await frisbyGetFunction(base_url, 'treatment/2');

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json.patientID).toBe(new_treatment2.patientID);
    });

    it.skip('3/5 - It must be possible to search for a treatment by patient.', async () => {
      await frisbyPostFunction(base_url, 'treatment', new_treatment);
      await frisbyPostFunction(base_url, 'treatment', new_treatment2);

      const frisby = await frisbyGetFunction(base_url, 'treatment/patient/2');

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json.patientID).toBe(new_treatment2.patientID);
    });

    it.skip('4/5 - It should not be possible to search for a treatment by non-existent id.', async () => {
      await frisbyPostFunction(base_url, 'treatment', new_treatment);
      await frisbyPostFunction(base_url, 'treatment', new_treatment2);

      const frisby = await frisbyGetFunction(base_url, 'treatment/3');

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: 'Error trying to find treatment with non-existent ID.',
      });
    });

    it.skip('5/5 - It should not be possible to search for a treatment by non-existent patient.', async () => {
      await frisbyPostFunction(base_url, 'treatment', new_treatment);
      await frisbyPostFunction(base_url, 'treatment', new_treatment2);

      const frisby = await frisbyGetFunction(base_url, 'treatment/patient/3');

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: 'Error trying to find treatment with non-existent patient.',
      });
    });
  });
});
