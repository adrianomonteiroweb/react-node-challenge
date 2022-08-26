const frisby = require('frisby');
const shell = require('shelljs');

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

const create_url =
  process.env.DEV === 'true'
    ? `http://${HOST}:${PORT}`
    : process.env.DEPLOY_URL;

const patiente_created = {
  firstName: 'Alex',
  lastName: 'Montes',
  email: 'alex@email.com',
  number: '85989876655',
  describe: '',
};

describe('# Patients', () => {
  beforeEach(() => {
    shell.exec('cd ./backend && yarn sequelize-cli db:drop');
    shell.exec(
      'cd ./backend && yarn sequelize-cli db:create && yarn sequelize-cli db:migrate'
    );
  });

  it('- It should be possible to add a new user.', async () => {
    await frisby
      .post(`${create_url}/patient`, patiente_created)
      .expect('status', 201)
      .then((response) => {
        const { body } = response;
        expect(patiente_created).toEqual(JSON.parse(body));
      });
  });
});
