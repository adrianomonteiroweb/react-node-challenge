exports.tryQueryServer = async (serverFunction, params, next) => {
  let result;

  try {
    result = await serverFunction(...params);
  } catch (error) {
    console.error(error.message);
    next(error);
  }

  return result;
};
