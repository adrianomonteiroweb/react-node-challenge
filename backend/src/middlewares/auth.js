const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { UNAUTHORIZED } = require('../utils/statusCodesConstructor');

const secret = fs.readFileSync(
  path.resolve(__dirname, '../../../jwt.evaluation.key'),
  'utf8'
);

exports.tokenGenerate = (user) => {
  const generatedToken = jwt.sign({ user }, secret, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return generatedToken;
};

exports.tokenValidation = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const { user } = jwt.verify(authorization, secret);

    if (user.role !== 'admin') {
      throw res.status(UNAUTHORIZED).json({
        message: 'Você não tem autorização para realizar essa atualização.',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(UNAUTHORIZED).json({
      message: 'Você não tem autorização para realizar essa atualização.',
    });

    next(error);
  }
};

exports.tokenCheck = (token) => {
  const tokenResult = jwt.verify(token, secret);

  return tokenResult;
};
