const frisby = require('frisby');

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

const create_url =
  process.env.DEV === 'true'
    ? `http://${HOST}:${PORT}`
    : process.env.DEPLOY_URL;
console.log('TEST ', create_url);
const patiente_created = {
  firstName: 'Alex',
  lastName: 'Montes',
  email: 'alex@email.com',
  numbe: '85989876655',
  describe: '',
};

describe('# Patients', () => {
  it('- It should be possible to add a new user.', async () => {
    await frisby
      .post(`${create_url}/patient`, patiente_created)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;

        expect(patiente_created).toEqual(JSON.parse(body));
      });
  });
});
