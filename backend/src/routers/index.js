const userRoutes = require('./users.routes');
const paymentRoutes = require('./payments.routes');
const treatmentRoutes = require('./treatments.routes');

const routes = [userRoutes, treatmentRoutes, paymentRoutes];

module.exports = routes;
