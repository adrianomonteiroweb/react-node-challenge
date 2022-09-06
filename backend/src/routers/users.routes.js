const {
  addUserController,
  updateUserController,
  getUsersController,
  getUserByIDController,
  getUserByEmailController,
  deleteUserController,
} = require('../database/controllers/users.controller');
const { tokenValidation } = require('../middlewares/auth');

const userRoutes = require('express').Router();

userRoutes.post('/user', addUserController);

userRoutes.put('/user/:id', tokenValidation, updateUserController);

userRoutes.get('/user', getUsersController);

userRoutes.get('/user/:id', getUserByIDController);

userRoutes.post('/user/email', getUserByEmailController);

userRoutes.delete('/user/:id', tokenValidation, deleteUserController);

module.exports = userRoutes;
