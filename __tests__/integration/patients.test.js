const shell = require('shelljs');
const {
  passwordEncryption,
} = require('../../backend/src/utils/passwordEncryption');

const {
  frisbyPostFunction,
  frisbyPutFunction,
  frisbyGetFunction,
  frisbyDeleteFunction,
} = require('../functions/frisbyFunctions');

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

const base_url =
  process.env.DEV === 'true'
    ? `http://${HOST}:${PORT}`
    : process.env.DEPLOY_URL;

const patient_created = {
  firstName: 'Alex',
  lastName: 'Montes',
  email: 'alex@email.com',
  password_hash: 'abcdefg1',
  number: '85989876655',
};

const result_patient_created = {
  firstName: 'Alex',
  lastName: 'Montes',
  email: 'alex@email.com',
  password_hash: passwordEncryption(patient_created.password_hash),
  number: '85989876655',
  role: 'user',
};

const patient_created2 = {
  firstName: 'Marcela',
  lastName: 'Santos',
  email: 'marcela@email.com',
  password_hash: 'abcdefg2',
  number: '88999403456',
  role: 'user',
};

const result_patient_created2 = {
  firstName: 'Marcela',
  lastName: 'Santos',
  email: 'marcela@email.com',
  password_hash: passwordEncryption(patient_created2.password_hash),
  number: '88999403456',
  role: 'user',
};

const patient_without_email = {
  firstName: 'Alex',
  lastName: 'Montes',
  password_hash: 'abcdefg1',
  number: '85989876655',
  role: 'user',
};

const patient_without_password = {
  firstName: 'Marcela',
  lastName: 'Santos',
  email: 'marcela@email.com',
  number: '88999403456',
  role: 'user',
};

const patient_without_role = {
  firstName: 'Marcela',
  lastName: 'Santos',
  email: 'marcela@email.com',
  password_hash: 'abcdefg2',
  number: '88999403456',
};

const patient_without_number = {
  firstName: 'Marcela',
  lastName: 'Santos',
  email: 'marcela@email.com',
  password_hash: 'abcdefg2',
  role: 'user',
};

const patient_without_firstName = {
  lastName: 'Santos',
  email: 'marcela@email.com',
  password_hash: 'abcdefg2',
  number: '88999403456',
  role: 'user',
};

const patient_without_lastName = {
  firstName: 'Marcela',
  email: 'marcela@email.com',
  password_hash: 'abcdefg2',
  number: '88999403456',
  role: 'user',
};

const patient_with_wrong_email = {
  firstName: 'Marcela',
  lastName: 'Santos',
  email: 'marcelaemail.com',
  password_hash: 'abcdefg2',
  number: '88999403456',
  role: 'user',
};

const patient_with_wrong_number = {
  firstName: 'Marcela',
  lastName: 'Santos',
  email: 'marcela@email.com',
  password_hash: 'abcdefg2',
  number: '8899940345',
  role: 'user',
};

const patient_updated = {
  firstName: 'Marcela',
  lastName: 'Santos',
  email: 'marcela@email.com',
  password_hash: 'abcdefg2',
  number: '99999403456',
  role: 'user',
};

describe('# Patients tests.', () => {
  describe('Creating patients - Testing required fields.', () => {
    beforeEach(() => {
      shell.exec('yarn db:drop');
      shell.exec('yarn db:create && yarn db:migrate');
    });

    it.skip('1/8 - It should be possible to add a new patient user.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'user',
        patient_created
      );

      expect(frisby._response.status).toEqual(201);
      expect(frisby._json).toEqual(result_patient_created);
    });

    it.skip('2/8 - It should not be possible to register a patient without the email.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'user',
        patient_without_email
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({ message: '"email" is required' });
    });

    it.skip('3/8 - It should not be possible to register a patient without the password.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'user',
        patient_without_password
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({ message: '"password" is required' });
    });

    it.skip('4/8 - It should not be possible to register a patient without the number.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'user',
        patient_without_number
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({ message: '"number" is required' });
    });

    it.skip('5/8 - It should not be possible to register a patient without the firstName.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'user',
        patient_without_firstName
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({ message: '"firstName" is required' });
    });

    it.skip('6/8 - It should not be possible to register a patient without the lastName.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'user',
        patient_without_lastName
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({ message: '"lastName" is required' });
    });

    it.skip('7/8 - A user without role information will be classified as a "user".', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'user',
        patient_without_role
      );

      expect(frisby._response.status).toEqual(201);
      expect(frisby._json.role).toEqual('user');
    });

    it.skip('8/8 - It should not be possible to create a user with already existing email.', async () => {
      await frisbyPostFunction(base_url, 'user', patient_created);

      const frisby = await frisbyPostFunction(
        base_url,
        'user',
        patient_created
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({ message: 'User already exists' });
    });
  });

  describe('Creating patients - Testing field formats.', () => {
    beforeEach(() => {
      shell.exec('cd ./backend && yarn sequelize-cli db:drop');
      shell.exec(
        'cd ./backend && yarn sequelize-cli db:create && yarn sequelize-cli db:migrate'
      );
    });

    it.skip('1/2 - It should not be possible to register a patient with the wrong email address.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'user',
        patient_with_wrong_email
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: '"email" must be a valid email',
      });
    });

    it.skip('2/2 - It should not be possible to register a patient with the wrong number.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'user',
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

    it.skip('1/2 - It should be possible to update a patient successfully.', async () => {
      await frisbyPostFunction(base_url, 'user', patient_created);

      const frisby = await frisbyPutFunction(
        base_url,
        'user/1',
        patient_updated
      );

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json).toEqual([1]);
    });

    it.skip('2/2 - It should not be possible to update a patient with a non-existent ID.', async () => {
      await frisbyPostFunction(base_url, 'user', patient_created);

      const frisby = await frisbyPutFunction(
        base_url,
        'user/2',
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

    it.skip('1/5 - It must be possible to search for all patients.', async () => {
      await frisbyPostFunction(base_url, 'user', patient_created);
      await frisbyPostFunction(base_url, 'user', patient_created2);

      const frisby = await frisbyGetFunction(base_url, 'user');

      delete result_patient_created.password_hash;
      delete result_patient_created2.password_hash;

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json).toEqual([
        { ...result_patient_created, id: 1 },
        { ...result_patient_created2, id: 2 },
      ]);
    });

    it.skip('2/5 - It must be possible to search for a patient by ID..', async () => {
      await frisbyPostFunction(base_url, 'user', patient_created);
      await frisbyPostFunction(base_url, 'user', patient_created2);

      const frisby = await frisbyGetFunction(base_url, 'user/2');

      delete result_patient_created2.password_hash;

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json).toEqual({ ...result_patient_created2, id: 2 });
    });

    it.skip('3/5 - It must be possible to search for a patient by email.', async () => {
      await frisbyPostFunction(base_url, 'user', patient_created);
      await frisbyPostFunction(base_url, 'user', patient_created2);

      const frisby = await frisbyPostFunction(base_url, 'user/email', {
        email: patient_created2.email,
      });

      delete result_patient_created2.password_hash;

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json).toEqual({ ...result_patient_created2, id: 2 });
    });

    it.skip('4/5 - It should not be possible to search for a patient by non-existent id.', async () => {
      await frisbyPostFunction(base_url, 'user', patient_created);
      await frisbyPostFunction(base_url, 'user', patient_created2);

      const frisby = await frisbyGetFunction(base_url, 'patient/3');

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: 'Error trying to find patient with non-existent ID.',
      });
    });

    it.skip('5/5 - It should not be possible to search for a patient by non-existent email.', async () => {
      await frisbyPostFunction(base_url, 'user', patient_created);
      await frisbyPostFunction(base_url, 'user', patient_created2);

      const frisby = await frisbyPostFunction(base_url, 'patient/email', {
        email: 'bruno@email.com',
      });

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: 'Error trying to find patient with non-existent email.',
      });
    });
  });

  describe('Delete patients.', () => {
    beforeEach(() => {
      shell.exec('cd ./backend && yarn sequelize-cli db:drop');
      shell.exec(
        'cd ./backend && yarn sequelize-cli db:create && yarn sequelize-cli db:migrate'
      );
    });

    it.skip('1/2 - It should be possible to delete a patient by their ID.', async () => {
      await frisbyPostFunction(base_url, 'user', patient_created);
      await frisbyPostFunction(base_url, 'user', patient_created2);

      const frisbyDelete = await frisbyDeleteFunction(base_url, 'user/1');

      expect(frisbyDelete._response.status).toEqual(200);
      expect(frisbyDelete._json).toEqual({
        message: 'Paciente de ID: 1 deletado com sucesso.',
      });

      const frisbyGetAll = await frisbyGetFunction(base_url, 'user');

      expect(frisbyGetAll._response.status).toEqual(200);
      expect(frisbyGetAll._json).toEqual([{ ...patient_created2, id: 2 }]);
    });

    it.skip('2/2 - It should not be possible to delete a patient with a non-existent ID.', async () => {
      await frisbyPostFunction(base_url, 'user', patient_created);

      const frisbyDelete = await frisbyDeleteFunction(base_url, 'user/2');

      expect(frisbyDelete._response.status).toEqual(404);
      expect(frisbyDelete._json).toEqual({
        message: 'Error ao tentar deletar paciente com ID inexistente.',
      });
    });
  });
});
