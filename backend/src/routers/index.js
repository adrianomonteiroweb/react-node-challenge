const userRoutes = require('./users.routes');
const paymentRoutes = require('./payments.routes');
const treatmentRoutes = require('./treatments.routes');
const loginRoutes = require('./login.routes');

const routes = [userRoutes, treatmentRoutes, paymentRoutes, loginRoutes];

module.exports = routes;
