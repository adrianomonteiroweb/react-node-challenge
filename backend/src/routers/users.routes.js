const {
  addUserController,
  updateUserController,
  getUsersController,
  getUserByIDController,
  getUserByEmailController,
  deleteUserController,
} = require('../database/controllers/users.controller');

const userRoutes = require('express').Router();

userRoutes.post('/user', addUserController);

userRoutes.put('/user/:id', updateUserController);

userRoutes.get('/user', getUsersController);

userRoutes.get('/user/:id', getUserByIDController);

userRoutes.post('/user/email', getUserByEmailController);

userRoutes.delete('/user/:id', deleteUserController);

module.exports = userRoutes;
