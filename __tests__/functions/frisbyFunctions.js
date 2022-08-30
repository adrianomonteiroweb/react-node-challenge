const frisby = require('frisby');

exports.frisbyPostFunction = async (baseURL, alias, object) =>
  await frisby.post(`${baseURL}/${alias}`, object);

exports.frisbyPutFunction = async (baseURL, alias, object) =>
  await frisby.put(`${baseURL}/${alias}`, object);

exports.frisbyGetFunction = async (baseURL, alias) =>
  await frisby.get(`${baseURL}/${alias}`);

exports.frisbyDeleteFunction = async (baseURL, alias) =>
  await frisby.delete(`${baseURL}/${alias}`);
