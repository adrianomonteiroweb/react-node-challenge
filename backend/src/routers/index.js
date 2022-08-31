const patientRoutes = require('./patients.routes');
const paymentRoutes = require('./payments.routes');
const treatmentRoutes = require('./treatments.routes');

const routes = [patientRoutes, treatmentRoutes, paymentRoutes];

module.exports = routes;
