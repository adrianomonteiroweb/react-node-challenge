const { tokenGenerate } = require('../../middlewares/auth');
const {
  errorMessageConstructor,
} = require('../../utils/errorMessageConstructor');
const { passwordEncryption } = require('../../utils/passwordEncryption');
const {
  BAD_REQUEST,
  UNAUTHORIZED,
} = require('../../utils/statusCodesConstructor');
const { users } = require('../models/index');
const { loginSchema } = require('../schemas');

const loginUserService = async (body) => {
  const { error } = loginSchema.validate(body);

  if (error) return errorMessageConstructor(BAD_REQUEST, error.message);

  const { email, password_hash } = body;

  const password_encrypted = passwordEncryption(password_hash);

  const search = await users.findOne({
    where: { email, password_hash: password_encrypted },
  });

  const user = {
    email,
  };

  if (search) {
    user['role'] = search.dataValues.role;
    user['id'] = search.dataValues.id;
  }

  const token = search
    ? tokenGenerate(user)
    : errorMessageConstructor(UNAUTHORIZED, 'Erro ao tentar realizar login.');

  return token;
};

module.exports = {
  loginUserService,
};
