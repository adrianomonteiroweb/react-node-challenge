const {
  errorMessageConstructor,
} = require('../../utils/errorMessageConstructor');
const {
  BAD_REQUEST,
  OK,
  NOT_FOUND,
} = require('../../utils/statusCodesConstructor');
const { users } = require('../models/index');
const { userSchema } = require('../schemas');

const addUserService = async (body) => {
  const { error } = userSchema.validate(body);

  if (error) return errorMessageConstructor(BAD_REQUEST, error.message);

  const { firstName, lastName, email, password_hash, number, role } = body;

  const created = await users.create({
    firstName,
    lastName,
    email,
    password_hash,
    number,
    role: role || 'user',
  });

  return {
    firstName: created.firstName,
    lastName: created.lastName,
    email: created.email,
    password_hash: created.password_hash,
    number: created.number,
    role: created.role,
  };
};

const updateUserService = async (id, body) => {
  const { error } = userSchema.validate(body);

  if (error) return errorMessageConstructor(BAD_REQUEST, error.message);

  const updated = await users.update(body, {
    where: {
      id,
    },
  });

  return updated[0] < 1
    ? errorMessageConstructor(
        BAD_REQUEST,
        'Error trying to update by wrong ID.'
      )
    : updated;
};

const getUsersService = async () => {
  const allUsers = await users.findAll();

  return allUsers.length < 1
    ? errorMessageConstructor(
        BAD_REQUEST,
        'It was not possible to search all users.'
      )
    : allUsers;
};

const getUserByIDService = async (id) => {
  const userByID = await users.findByPk(id);

  return !userByID
    ? errorMessageConstructor(
        BAD_REQUEST,
        'Error trying to find user with non-existent ID.'
      )
    : userByID;
};

const getUserByEmailService = async (email) => {
  const userByEmail = await users.findOne({
    where: { email },
  });

  return !userByEmail
    ? errorMessageConstructor(
        BAD_REQUEST,
        'Error trying to find user with non-existent email.'
      )
    : userByEmail;
};

const deleteUserService = async (id) => {
  const deleted = await users.destroy({
    where: {
      id,
    },
  });

  return deleted < 1
    ? errorMessageConstructor(
        NOT_FOUND,
        'Error ao tentar deletar paciente com ID inexistente.'
      )
    : errorMessageConstructor(OK, `User de ID: ${id} deletado com sucesso.`);
};

module.exports = {
  addUserService,
  updateUserService,
  getUsersService,
  getUserByIDService,
  getUserByEmailService,
  deleteUserService,
};
