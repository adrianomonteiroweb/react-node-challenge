const shell = require('shelljs');

const {
  frisbyPostFunction,
  frisbyPutFunction,
  frisbyGetFunction,
  frisbyDeleteFunction,
} = require('../functions/frisbyFunctions');

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

const create_url =
  process.env.DEV === 'true'
    ? `http://${HOST}:${PORT}`
    : process.env.DEPLOY_URL;

const patient_created = {
  firstName: 'Alex',
  lastName: 'Montes',
  email: 'alex@email.com',
  number: '85989876655',
  describe: '',
};

const patient_created2 = {
  firstName: 'Marcela',
  lastName: 'Santos',
  email: 'marcela@email.com',
  number: '88999403456',
  describe: 'Paciente VIP',
};

const patient_without_email = {
  firstName: 'Alex',
  lastName: 'Montes',
  number: '85989876655',
  describe: '',
};

const patient_without_number = {
  firstName: 'Alex',
  lastName: 'Montes',
  email: 'alex@email.com',
  describe: '',
};

const patient_without_firstName = {
  lastName: 'Montes',
  email: 'alex@email.com',
  number: '85989876655',
  describe: '',
};

const patient_without_lastName = {
  firstName: 'Alex',
  email: 'alex@email.com',
  number: '85989876655',
  describe: '',
};

const patient_with_wrong_email = {
  firstName: 'Alex',
  lastName: 'Montes',
  email: 'alexemail.com',
  number: '85989876655',
  describe: '',
};

const patient_with_wrong_number = {
  firstName: 'Alex',
  lastName: 'Montes',
  email: 'alex@email.com',
  number: '8598987665',
  describe: '',
};

const patient_updated = {
  firstName: 'Alex',
  lastName: 'Montes',
  email: 'alex@email.com',
  number: '85989876655',
  describe: 'Atualizado',
};

describe('# Patients tests.', () => {
  describe('Creating patients - Testing required fields.', () => {
    beforeEach(() => {
      shell.exec('cd ./backend && yarn sequelize-cli db:drop');
      shell.exec(
        'cd ./backend && yarn sequelize-cli db:create && yarn sequelize-cli db:migrate'
      );
    });

    it('1/5 - It should be possible to add a new user.', async () => {
      const frisby = await frisbyPostFunction(
        create_url,
        'patient',
        patient_created
      );

      expect(frisby._response.status).toEqual(201);
      expect(frisby._json).toEqual(patient_created);
    });

    it('2/5 - It should not be possible to register a patient without the email.', async () => {
      const frisby = await frisbyPostFunction(
        create_url,
        'patient',
        patient_without_email
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({ message: '"email" is required' });
    });

    it('3/5 - It should not be possible to register a patient without the number.', async () => {
      const frisby = await frisbyPostFunction(
        create_url,
        'patient',
        patient_without_number
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({ message: '"number" is required' });
    });

    it('4/5 - It should not be possible to register a patient without the firstName.', async () => {
      const frisby = await frisbyPostFunction(
        create_url,
        'patient',
        patient_without_firstName
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({ message: '"firstName" is required' });
    });

    it('5/5 - It should not be possible to register a patient without the lastName.', async () => {
      const frisby = await frisbyPostFunction(
        create_url,
        'patient',
        patient_without_lastName
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({ message: '"lastName" is required' });
    });
  });

  describe('Creating patients - Testing field formats.', () => {
    beforeEach(() => {
      shell.exec('cd ./backend && yarn sequelize-cli db:drop');
      shell.exec(
        'cd ./backend && yarn sequelize-cli db:create && yarn sequelize-cli db:migrate'
      );
    });

    it('1/2 - It should not be possible to register a patient with the wrong email address.', async () => {
      const frisby = await frisbyPostFunction(
        create_url,
        'patient',
        patient_with_wrong_email
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: '"email" must be a valid email',
      });
    });

    it('2/2 - It should not be possible to register a patient with the wrong number.', async () => {
      const frisby = await frisbyPostFunction(
        create_url,
        'patient',
        patient_with_wrong_number
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: '"number" length must be at least 11 characters long',
      });
    });
  });

  describe('Updating patients.', () => {
    beforeEach(() => {
      shell.exec('cd ./backend && yarn sequelize-cli db:drop');
      shell.exec(
        'cd ./backend && yarn sequelize-cli db:create && yarn sequelize-cli db:migrate'
      );
    });

    it('1/2 - It should be possible to update a patient successfully.', async () => {
      await frisbyPostFunction(create_url, 'patient', patient_created);

      const frisby = await frisbyPutFunction(
        create_url,
        'patient/1',
        patient_updated
      );

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json).toEqual([1]);
    });

    it('2/2 - It should not be possible to update a patient with a non-existent ID.', async () => {
      await frisbyPostFunction(create_url, 'patient', patient_created);

      const frisby = await frisbyPutFunction(
        create_url,
        'patient/2',
        patient_updated
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: 'Error trying to update by wrong ID.',
      });
    });
  });

  describe('Gettings patients.', () => {
    beforeEach(() => {
      shell.exec('cd ./backend && yarn sequelize-cli db:drop');
      shell.exec(
        'cd ./backend && yarn sequelize-cli db:create && yarn sequelize-cli db:migrate'
      );
    });

    it('1/5 - It must be possible to search for all patients.', async () => {
      await frisbyPostFunction(create_url, 'patient', patient_created);
      await frisbyPostFunction(create_url, 'patient', patient_created2);

      const frisby = await frisbyGetFunction(create_url, 'patient');

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json).toEqual([
        { ...patient_created, id: 1 },
        { ...patient_created2, id: 2 },
      ]);
    });

    it('2/5 - It must be possible to search for a patient by ID..', async () => {
      await frisbyPostFunction(create_url, 'patient', patient_created);
      await frisbyPostFunction(create_url, 'patient', patient_created2);

      const frisby = await frisbyGetFunction(create_url, 'patient/2');

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json).toEqual({ ...patient_created2, id: 2 });
    });

    it('3/5 - It must be possible to search for a patient by email.', async () => {
      await frisbyPostFunction(create_url, 'patient', patient_created);
      await frisbyPostFunction(create_url, 'patient', patient_created2);

      const frisby = await frisbyPostFunction(create_url, 'patient/email', {
        email: patient_created2.email,
      });

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json).toEqual({ ...patient_created2, id: 2 });
    });

    it('4/5 - It should not be possible to search for a patient by non-existent id.', async () => {
      await frisbyPostFunction(create_url, 'patient', patient_created);
      await frisbyPostFunction(create_url, 'patient', patient_created2);

      const frisby = await frisbyGetFunction(create_url, 'patient/3');

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: 'Error trying to find patient with non-existent ID.',
      });
    });

    it('5/5 - It should not be possible to search for a patient by non-existent email.', async () => {
      await frisbyPostFunction(create_url, 'patient', patient_created);
      await frisbyPostFunction(create_url, 'patient', patient_created2);

      const frisby = await frisbyPostFunction(create_url, 'patient/email', {
        email: 'bruno@email.com',
      });

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: 'Error trying to find patient with non-existent email.',
      });
    });
  });

  describe.only('Delete patients.', () => {
    beforeEach(() => {
      shell.exec('cd ./backend && yarn sequelize-cli db:drop');
      shell.exec(
        'cd ./backend && yarn sequelize-cli db:create && yarn sequelize-cli db:migrate'
      );
    });

    it('1/2 - It should be possible to delete a patient by their ID.', async () => {
      await frisbyPostFunction(create_url, 'patient', patient_created);
      await frisbyPostFunction(create_url, 'patient', patient_created2);

      const frisbyDelete = await frisbyDeleteFunction(create_url, 'patient/1');

      expect(frisbyDelete._response.status).toEqual(200);
      expect(frisbyDelete._json).toEqual({
        message: 'Paciente de ID: 1 deletado com sucesso.',
      });

      const frisbyGetAll = await frisbyGetFunction(create_url, 'patient');

      expect(frisbyGetAll._response.status).toEqual(200);
      expect(frisbyGetAll._json).toEqual([{ ...patient_created2, id: 2 }]);
    });

    it('2/2 - It should not be possible to delete a patient with a non-existent ID.', async () => {
      await frisbyPostFunction(create_url, 'patient', patient_created);

      const frisbyDelete = await frisbyDeleteFunction(create_url, 'patient/2');

      expect(frisbyDelete._response.status).toEqual(404);
      expect(frisbyDelete._json).toEqual({
        message: 'Error ao tentar deletar paciente com ID inexistente.',
      });
    });
  });
});
