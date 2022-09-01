require('dotenv').config();

module.exports = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || '5432',
  database: process.env.DB_NAME || 'my_patients_db',
  username: process.env.DB_USER || 'dev',
  password: process.env.DB_PASSWORD || 'dev',
  dialect: 'postgres',
};
