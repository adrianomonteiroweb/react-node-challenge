const loginRoutes = require('express').Router();

loginRoutes.post('/user', loginUserController);

module.exports = loginRoutes;
