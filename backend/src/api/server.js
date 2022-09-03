const app = require('./app');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

const DEV =
  process.env.DEV === 'true'
    ? `Listenning on http://${HOST}:${PORT}`
    : `Listenning on ${process.env.DEPLOY_URL}`;

app.listen(PORT, () => console.log(DEV));
