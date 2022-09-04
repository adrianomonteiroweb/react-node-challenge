const {
  loginUserController,
} = require('../database/controllers/login.controller');

const loginRoutes = require('express').Router();

loginRoutes.post('/login', loginUserController);

module.exports = loginRoutes;
