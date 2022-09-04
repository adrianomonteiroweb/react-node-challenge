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

  if (error)
    return errorMessageConstructor(
      BAD_REQUEST,
      '"password_hash" must be a valid email'
    );

  const { email, password_hash } = body;

  const search = await users.findOne({
    where: { email, password_hash },
  });

  const token = search
    ? tokenGenerate(email, search.role, search.id)
    : errorMessageConstructor(UNAUTHORIZED, 'Erro ao tentar realizar login.');

  return token;
};

module.exports = {
  loginUserService,
};
