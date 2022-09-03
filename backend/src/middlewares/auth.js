const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

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

exports.tokenValidation = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    const { user } = jwt.verify(authorization, secret);

    req.user = user;

    next();
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};
