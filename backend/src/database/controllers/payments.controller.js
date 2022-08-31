const { CREATED } = require('../../utils/statusCodesConstructor');
const { tryQueryServer } = require('../../utils/tryServer');
const { addPaymentServer } = require('../services/payments.service');

const addPaymentController = async (req, res, next) => {
  const result = await tryQueryServer(addPaymentServer, [req.body], next);

  return result.status
    ? res.status(result.status).json({ message: result.message })
    : res.status(CREATED).json(result);
};

module.exports = { addPaymentController };
