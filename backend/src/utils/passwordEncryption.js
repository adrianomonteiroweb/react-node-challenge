const crypto = require('crypto');

exports.passwordEncryption = (password) => {
  const passwordEncrypted = crypto
    .createHash('md5')
    .update(password)
    .digest('hex');

  return passwordEncrypted;
};
