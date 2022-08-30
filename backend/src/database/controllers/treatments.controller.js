const { CREATED } = require('../../utils/statusCodesConstructor');
const { tryQueryServer } = require('../../utils/tryServer');

const addTreatmentController = async (req, res, next) => {
  const result = await tryQueryServer(addTreatmentServer, [req.body], next);

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(CREATED).json(result);
};

module.exports = { addTreatmentController };
