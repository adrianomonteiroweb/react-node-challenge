const { tokenGenerate } = require('../../middlewares/auth');
const {
  errorMessageConstructor,
} = require('../../utils/errorMessageConstructor');
const { BAD_REQUEST } = require('../../utils/statusCodesConstructor');
const { users } = require('../models/index');
const { userSchema } = require('../schemas');

const loginUserService = async (body) => {
  const { error } = userSchema.validate(body);

  if (error) return errorMessageConstructor(BAD_REQUEST, error.message);

  const { email, password_hash } = body;

  const { id } = await users.findOne({
    where: { email, password_hash },
  });

  const token = tokenGenerate(email, role, id);

  return token;
};

module.exports = {
  loginUserService,
};
