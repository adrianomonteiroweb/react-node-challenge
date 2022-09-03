const { CREATED, OK } = require('../../utils/statusCodesConstructor');
const { tryQueryServer } = require('../../utils/tryServer');
const {
  addUserService,
  updateUserService,
  getUsersService,
  getUserByIDService,
  getUserByEmailService,
  deleteUserService,
} = require('../services/users.service');

const addUserController = async (req, res, next) => {
  const result = await tryQueryServer(addUserService, [req.body], next);

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(CREATED).json(result);
};

const updateUserController = async (req, res, next) => {
  const result = await tryQueryServer(
    updateUserService,
    [req.params.id, req.body],
    next
  );

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

const getUsersController = async (_req, res, next) => {
  const result = await tryQueryServer(getUsersService, [], next);

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

const getUserByIDController = async (req, res, next) => {
  const result = await tryQueryServer(
    getUserByIDService,
    [req.params.id],
    next
  );

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

const getUserByEmailController = async (req, res, next) => {
  const result = await tryQueryServer(
    getUserByEmailService,
    [req.body.email],
    next
  );

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

const deleteUserController = async (req, res, next) => {
  const result = await tryQueryServer(deleteUserService, [req.params.id], next);

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json(result);
};

module.exports = {
  addUserController,
  updateUserController,
  getUsersController,
  getUserByIDController,
  getUserByEmailController,
  deleteUserController,
};
