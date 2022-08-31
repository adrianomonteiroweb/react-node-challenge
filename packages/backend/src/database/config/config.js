require('dotenv').config();

module.exports = {
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: process.env.MYSQL_PORT || '5432',
  database: process.env.MYSQL_DB_NAME || 'my_patients_db',
  username: process.env.MYSQL_USER || 'dev',
  password: process.env.MYSQL_PASSWORD || 'dev',
  dialect: 'postgres',
};
