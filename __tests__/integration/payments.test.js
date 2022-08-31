const shell = require('shelljs');
const { frisbyPostFunction } = require('../functions/frisbyFunctions');

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

const base_url =
  process.env.DEV === 'true'
    ? `http://${HOST}:${PORT}`
    : process.env.DEPLOY_URL;

let formated_date = new Date();

const new_payment = {
  patientID: 1,
  treatmentID: 1,
  paymentDate: formated_date,
  installment: 1,
};

const new_payment2 = {
  patientID: 2,
  treatmentID: 2,
  paymentDate: formated_date,
  installment: 2,
};

const payment_without_patient = {
  treatmentID: 1,
  paymentDate: formated_date,
  installment: 1,
};

const payment_without_treatment = {
  patientID: 1,
  paymentDate: formated_date,
  installment: 1,
};

const payment_without_installment = {
  patientID: 1,
  treatmentID: 1,
  paymentDate: formated_date,
};

const payment_updated_installment = {
  installment: 1,
};

describe('# Payment tests.', () => {
  describe('Creating payments - Testing required fields.', () => {
    beforeEach(() => {
      shell.exec('cd ./backend && yarn sequelize-cli db:drop');
      shell.exec(
        'cd ./backend && yarn sequelize-cli db:create && yarn sequelize-cli db:migrate'
      );
    });

    it.skip('1/4 - It should be possible to add a new payment.', async () => {
      const frisby = await frisbyPostFunction(base_url, 'payment', new_payment);

      expect(frisby._response.status).toEqual(201);
      expect(frisby._json.patientID).toEqual(new_payment.patientID);
    });

    it.skip('2/4 - It should not be possible to register a payment without the patient.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'payment',
        payment_without_patient
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({ message: '"patientID" is required' });
    });

    it.skip('3/4 - It should not be possible to register a payment without the value.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'payment',
        payment_without_treatment
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: '"treatmentID" is required',
      });
    });

    it.skip('4/4 - It should not be possible to register a payment without the number of installments.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'payment',
        payment_without_installment
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: '"installment" is required',
      });
    });
  });

  describe('Updating payments.', () => {
    beforeEach(() => {
      shell.exec('cd ./backend && yarn sequelize-cli db:drop');
      shell.exec(
        'cd ./backend && yarn sequelize-cli db:create && yarn sequelize-cli db:migrate'
      );
    });

    it.skip('1/3 - It should be possible to update a payment successfully.', async () => {
      await frisbyPostFunction(base_url, 'payment', new_payment);

      const frisby = await frisbyPutFunction(
        base_url,
        'payment/1',
        payment_updated_value
      );

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json).toEqual([1]);
    });

    it.skip('2/3 - It should be possible to update a payment successfully.', async () => {
      await frisbyPostFunction(base_url, 'payment', new_payment);

      const frisby = await frisbyPutFunction(
        base_url,
        'payment/1',
        payment_updated_end_date
      );

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json).toEqual([1]);
    });

    it.skip('3/3 - It should not be possible to update a patient with a non-existent ID.', async () => {
      await frisbyPostFunction(base_url, 'payment', new_payment);

      const frisby = await frisbyPutFunction(
        base_url,
        'payment/2',
        payment_updated_value
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: 'Error trying to update by wrong ID.',
      });
    });
  });

  describe('Gettings payments.', () => {
    beforeEach(() => {
      shell.exec('cd ./backend && yarn sequelize-cli db:drop');
      shell.exec(
        'cd ./backend && yarn sequelize-cli db:create && yarn sequelize-cli db:migrate'
      );
    });

    it.skip('1/5 - It must be possible to search for all payments.', async () => {
      await frisbyPostFunction(base_url, 'payment', new_payment);
      await frisbyPostFunction(base_url, 'payment', new_payment2);

      const frisby = await frisbyGetFunction(base_url, 'payment');

      frisby._json.map((payment) => {
        payment['startDate'] = new Date(`${payment.startDate}`);
      });

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json.length).toBe(2);
      expect(frisby._json[0].patientID).toBe(new_payment.patientID);
      expect(frisby._json[1].patientID).toBe(new_payment2.patientID);
    });

    it.skip('2/5 - It must be possible to search for a payment by ID..', async () => {
      await frisbyPostFunction(base_url, 'payment', new_payment);
      await frisbyPostFunction(base_url, 'payment', new_payment2);

      const frisby = await frisbyGetFunction(base_url, 'payment/2');

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json.patientID).toBe(new_payment2.patientID);
    });

    it.skip('3/5 - It must be possible to search for a payment by patient.', async () => {
      await frisbyPostFunction(base_url, 'payment', new_payment);
      await frisbyPostFunction(base_url, 'payment', new_payment2);

      const frisby = await frisbyGetFunction(base_url, 'payment/patient/2');

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json.patientID).toBe(new_payment2.patientID);
    });

    it.skip('4/5 - It should not be possible to search for a payment by non-existent id.', async () => {
      await frisbyPostFunction(base_url, 'payment', new_payment);
      await frisbyPostFunction(base_url, 'payment', new_payment2);

      const frisby = await frisbyGetFunction(base_url, 'payment/3');

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: 'Error trying to find payment with non-existent ID.',
      });
    });

    it.skip('5/5 - It should not be possible to search for a payment by non-existent patient.', async () => {
      await frisbyPostFunction(base_url, 'payment', new_payment);
      await frisbyPostFunction(base_url, 'payment', new_payment2);

      const frisby = await frisbyGetFunction(base_url, 'payment/patient/3');

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: 'Error trying to find payment with non-existent patient.',
      });
    });
  });

  describe('Delete payments.', () => {
    beforeEach(() => {
      shell.exec('cd ./backend && yarn sequelize-cli db:drop');
      shell.exec(
        'cd ./backend && yarn sequelize-cli db:create && yarn sequelize-cli db:migrate'
      );
    });

    it.skip('1/2 - It should be possible to delete a payment by their ID.', async () => {
      await frisbyPostFunction(base_url, 'payment', new_payment);
      await frisbyPostFunction(base_url, 'payment', new_payment2);

      const frisbyDelete = await frisbyDeleteFunction(base_url, 'payment/1');

      expect(frisbyDelete._response.status).toEqual(200);
      expect(frisbyDelete._json).toEqual({
        message: 'ID handling: 1 deleted successfully.',
      });

      const frisbyGetAll = await frisbyGetFunction(base_url, 'payment');

      expect(frisbyGetAll._response.status).toEqual(200);
      expect(frisbyGetAll._json[0].patientID).toBe(new_payment2.patientID);
    });

    it.skip('2/2 - It should not be possible to delete a payment with a non-existent ID.', async () => {
      await frisbyPostFunction(base_url, 'payment', new_payment);

      const frisbyDelete = await frisbyDeleteFunction(base_url, 'payment/2');

      expect(frisbyDelete._response.status).toEqual(404);
      expect(frisbyDelete._json).toEqual({
        message: 'Error when trying to delete payment with non-existent ID.',
      });
    });
  });
});
