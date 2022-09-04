const shell = require('shelljs');
const { tokenCheck } = require('../../backend/src/middlewares/auth');

const {
  frisbyPostFunction,
  frisbyPutFunction,
  frisbyGetFunction,
  frisbyFunction,
} = require('../functions/frisbyFunctions');

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

const base_url =
  process.env.DEV === 'true'
    ? `http://${HOST}:${PORT}`
    : process.env.DEPLOY_URL;

const admin_created = {
  firstName: 'Fernando',
  lastName: 'Pacheco',
  email: 'fernando@email.com',
  password_hash: 'abcdefg1',
  number: '85989876655',
  role: 'admin',
};

const admin_created2 = {
  firstName: 'Georgia',
  lastName: 'Santos',
  email: 'georgia@email.com',
  password_hash: 'abcdefg2',
  number: '88999403456',
  role: 'admin',
};

const admin_without_email = {
  firstName: 'Fernando',
  lastName: 'Pacheco',
  password_hash: 'abcdefg1',
  number: '85989876655',
  role: 'admin',
};

const admin_without_password = {
  firstName: 'Georgia',
  lastName: 'Santos',
  email: 'georgia@email.com',
  number: '88999403456',
  role: 'admin',
};

const admin_without_role = {
  firstName: 'Georgia',
  lastName: 'Santos',
  email: 'georgia@email.com',
  password_hash: 'abcdefg2',
  number: '88999403456',
};

const admin_without_number = {
  firstName: 'Georgia',
  lastName: 'Santos',
  email: 'georgia@email.com',
  password_hash: 'abcdefg2',
  role: 'admin',
};

const admin_without_firstName = {
  lastName: 'Santos',
  email: 'georgia@email.com',
  password_hash: 'abcdefg2',
  number: '88999403456',
  role: 'admin',
};

const admin_without_lastName = {
  firstName: 'Georgia',
  email: 'georgia@email.com',
  password_hash: 'abcdefg2',
  number: '88999403456',
  role: 'admin',
};

const admin_with_wrong_email = {
  firstName: 'Georgia',
  lastName: 'Santos',
  email: 'georgiaemail.com',
  password_hash: 'abcdefg2',
  number: '88999403456',
  role: 'admin',
};

const admin_with_wrong_number = {
  firstName: 'Georgia',
  lastName: 'Santos',
  email: 'georgia@email.com',
  password_hash: 'abcdefg2',
  number: '8899940345',
  role: 'admin',
};

const admin_updated = {
  firstName: 'Georgia',
  lastName: 'Santos',
  email: 'georgia@email.com',
  password_hash: 'abcdefg2',
  number: '99999403456',
  role: 'admin',
};

const login = {
  email: 'georgia@email.com',
  password_hash: 'abcdefg2',
};

const login_without_email = {
  password_hash: 'abcdefg2',
};

const login_without_password = {
  email: 'georgia@email.com',
};

const login_with_invalid_email = {
  email: 'georgia@emailcom',
  password_hash: 'abcdefg2',
};

const login_with_invalid_password = {
  email: 'georgia@email.com',
  password_hash: 'abcdefg',
};

describe('# admins tests.', () => {
  describe('Creating admins - Testing required fields.', () => {
    beforeEach(() => {
      shell.exec('yarn db:drop');
      shell.exec('yarn db:create && yarn db:migrate');
    });

    it.skip('1/7 - It should be possible to add a new admin user.', async () => {
      const frisby = await frisbyPostFunction(base_url, 'user', admin_created);

      expect(frisby._response.status).toEqual(201);
      expect(frisby._json).toEqual(admin_created);
    });

    it.skip('2/7 - It should not be possible to register a admin without the email.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'user',
        admin_without_email
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({ message: '"email" is required' });
    });

    it.skip('3/7 - It should not be possible to register a admin without the password.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'user',
        admin_without_password
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({ message: '"password_hash" is required' });
    });

    it.skip('4/7 - It should not be possible to register a admin without the number.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'user',
        admin_without_number
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({ message: '"number" is required' });
    });

    it.skip('5/7 - It should not be possible to register a admin without the firstName.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'user',
        admin_without_firstName
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({ message: '"firstName" is required' });
    });

    it.skip('6/7 - It should not be possible to register a admin without the lastName.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'user',
        admin_without_lastName
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({ message: '"lastName" is required' });
    });

    it.skip('7/7 - It should not be possible to register a admin without the role.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'user',
        admin_without_role
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({ message: '"role" is required' });
    });
  });

  describe('Creating admins - Testing field formats.', () => {
    beforeEach(() => {
      shell.exec('yarn db:drop');
      shell.exec('yarn db:create && yarn db:migrate');
    });

    it.skip('1/2 - It should not be possible to register a admin with the wrong email address.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'user',
        admin_with_wrong_email
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: '"email" must be a valid email',
      });
    });

    it.skip('2/2 - It should not be possible to register a admin with the wrong number.', async () => {
      const frisby = await frisbyPostFunction(
        base_url,
        'user',
        admin_with_wrong_number
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: '"number" length must be at least 11 characters long',
      });
    });
  });

  describe('Updating admins.', () => {
    beforeEach(() => {
      shell.exec('yarn db:drop');
      shell.exec('yarn db:create && yarn db:migrate');
    });

    it.skip('1/2 - It should be possible to update a admin successfully.', async () => {
      await frisbyPostFunction(base_url, 'user', admin_created);

      const frisby = await frisbyPutFunction(base_url, 'user/1', admin_updated);

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json).toEqual([1]);
    });

    it.skip('2/2 - It should not be possible to update a admin with a non-existent ID.', async () => {
      await frisbyPostFunction(base_url, 'user', admin_created);

      const frisby = await frisbyPutFunction(base_url, 'user/2', admin_updated);

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: 'Error trying to update by wrong ID.',
      });
    });
  });

  describe('Gettings admins.', () => {
    beforeEach(() => {
      shell.exec('yarn db:drop');
      shell.exec('yarn db:create && yarn db:migrate');
    });

    it.skip('1/5 - It must be possible to search for all admins.', async () => {
      await frisbyPostFunction(base_url, 'user', admin_created);
      await frisbyPostFunction(base_url, 'user', admin_created2);

      const frisby = await frisbyGetFunction(base_url, 'user');

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json).toEqual([
        { ...admin_created, id: 1 },
        { ...admin_created2, id: 2 },
      ]);
    });

    it.skip('2/5 - It must be possible to search for a admin by ID..', async () => {
      await frisbyPostFunction(base_url, 'user', admin_created);
      await frisbyPostFunction(base_url, 'user', admin_created2);

      const frisby = await frisbyGetFunction(base_url, 'user/2');

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json).toEqual({ ...admin_created2, id: 2 });
    });

    it.skip('3/5 - It must be possible to search for a admin by email.', async () => {
      await frisbyPostFunction(base_url, 'user', admin_created);
      await frisbyPostFunction(base_url, 'user', admin_created2);

      const frisby = await frisbyPostFunction(base_url, 'admin/email', {
        email: admin_created2.email,
      });

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json).toEqual({ ...admin_created2, id: 2 });
    });

    it.skip('4/5 - It should not be possible to search for a admin by non-existent id.', async () => {
      await frisbyPostFunction(base_url, 'user', admin_created);
      await frisbyPostFunction(base_url, 'user', admin_created2);

      const frisby = await frisbyGetFunction(base_url, 'admin/3');

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: 'Error trying to find admin with non-existent ID.',
      });
    });

    it.skip('5/5 - It should not be possible to search for a admin by non-existent email.', async () => {
      await frisbyPostFunction(base_url, 'user', admin_created);
      await frisbyPostFunction(base_url, 'user', admin_created2);

      const frisby = await frisbyPostFunction(base_url, 'admin/email', {
        email: 'bruno@email.com',
      });

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: 'Error trying to find admin with non-existent email.',
      });
    });
  });

  describe('Delete admins.', () => {
    beforeEach(() => {
      shell.exec('yarn db:drop');
      shell.exec('yarn db:create && yarn db:migrate');
    });

    it.skip('1/2 - It should be possible to delete a admin by their ID.', async () => {
      await frisbyPostFunction(base_url, 'user', admin_created);
      await frisbyPostFunction(base_url, 'user', admin_created2);

      const frisby = await frisbyFunction(base_url, 'user/1');

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json).toEqual({
        message: 'Paciente de ID: 1 deletado com sucesso.',
      });

      const frisbyGetAll = await frisbyGetFunction(base_url, 'user');

      expect(frisbyGetAll._response.status).toEqual(200);
      expect(frisbyGetAll._json).toEqual([{ ...admin_created2, id: 2 }]);
    });

    it.skip('2/2 - It should not be possible to delete a admin with a non-existent ID.', async () => {
      await frisbyPostFunction(base_url, 'user', admin_created);

      const frisby = await frisbyFunction(base_url, 'user/2');

      expect(frisby._response.status).toEqual(404);
      expect(frisby._json).toEqual({
        message: 'Error ao tentar deletar paciente com ID inexistente.',
      });
    });
  });

  describe('Login admins.', () => {
    beforeEach(() => {
      shell.exec('yarn db:drop');
      shell.exec('yarn db:create && yarn db:migrate');
    });

    it.skip('1/5 - It must be able to log in and receive a valid token.', async () => {
      await frisbyPostFunction(base_url, 'user', admin_created2);

      const frisby = await frisbyPostFunction(base_url, 'login', login);

      expect(frisby._response.status).toEqual(200);
      expect(frisby._json).toHaveProperty('token');

      const token = frisby._json.token;
      const resultToken = tokenCheck(token);

      expect(resultToken.user).toEqual(login.email);
    });

    it.skip('2/5 - It should not be possible to log in without informing the email.', async () => {
      await frisbyPostFunction(base_url, 'user', admin_created2);

      const frisby = await frisbyPostFunction(
        base_url,
        'login',
        login_without_email
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: '"email" is required',
      });
    });

    it.skip('3/5 - It should not be possible to log in without informing the password.', async () => {
      await frisbyPostFunction(base_url, 'user', admin_created2);

      const frisby = await frisbyPostFunction(
        base_url,
        'login',
        login_without_password
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: '"password_hash" is required',
      });
    });

    it.skip('4/5 - It should not be possible to log in with invalid email.', async () => {
      await frisbyPostFunction(base_url, 'user', admin_created2);

      const frisby = await frisbyPostFunction(
        base_url,
        'login',
        login_with_invalid_email
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: '"email" must be a valid email',
      });
    });

    it.skip('5/5 - It should not be possible to log in with invalid password.', async () => {
      await frisbyPostFunction(base_url, 'user', admin_created2);

      const frisby = await frisbyPostFunction(
        base_url,
        'login',
        login_with_invalid_password
      );

      expect(frisby._response.status).toEqual(400);
      expect(frisby._json).toEqual({
        message: '"password_hash" must be a valid email',
      });
    });
  });
});
