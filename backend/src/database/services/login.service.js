const { tokenGenerate } = require('../../middlewares/auth');
const {
  errorMessageConstructor,
} = require('../../utils/errorMessageConstructor');
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

  const search = await users.findOne({
    where: { email, password_hash },
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
