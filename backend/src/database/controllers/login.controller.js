const { OK } = require('../../utils/statusCodesConstructor');
const { tryQueryServer } = require('../../utils/tryServer');
const { loginUserService } = require('../services/login.service');

const loginUserController = async (req, res, next) => {
  const result = await tryQueryServer(loginUserService, [req.body], next);

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(OK).json({ token: result });
};

module.exports = {
  loginUserController,
};
