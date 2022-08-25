require('dotenv').config();

const environment = process.env.NODE_ENV || 'test';

const suffix = {
  prod: '',
  production: '',
  dev: '-dev',
  development: '-dev',
  test: '-test',
};

const options = {
  host: process.env.MYSQL_HOST || 'mysql',
  port: process.env.MYSQL_PORT || '3306',
  database: `${process.env.MYSQL_DB_NAME || 'my_patients_db'}${
    suffix[environment] || suffix.test
  }`,
  username: process.env.MYSQL_USER || 'adrianomonteirodev',
  password: process.env.MYSQL_PASSWORD || 'adrianomonteirodev',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};
