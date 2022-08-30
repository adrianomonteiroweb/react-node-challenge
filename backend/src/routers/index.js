const patientRoutes = require('./patients.routes');
const treatmentRoutes = require('./treatments.routes');

const routes = [patientRoutes, treatmentRoutes];

module.exports = routes;
