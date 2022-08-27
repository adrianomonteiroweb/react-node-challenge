const frisby = require('frisby');

exports.frisbyPostFunction = async (baseURL, alias, object) =>
  await frisby.post(`${baseURL}/${alias}`, object);
