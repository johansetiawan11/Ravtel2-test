const errorSid = require("../../const/errorSid");

function getAccountHandlerFcomposer(diHash) {
  const {
    dbModelHash,
  } = diHash;
  const {
    Account,
  } = dbModelHash;

  async function getAccountHandler(req, res) {
    try {
      const params = req.params;
      const accountId = params.id;

      const accountQueryResponse = await Account
      .query()
      .where("id", accountId);
      if (!(accountQueryResponse && (accountQueryResponse.length > 0))) {
        return res.status(404).send({
          message: errorSid.GET_ACCOUNT_HANDLER_ACCOUNT_RECORD_NOT_FOUND,
        });
      }
      const accountRecord = accountQueryResponse[0];

      return res.status(200).json({
        data: accountRecord,
      });
    } catch (err) {
      console.error(err);

      return res.status(503).send({
        message: errorSid.GET_ACCOUNT_HANDLER_OPERATION_FAILED,
        debugInfo: err.message,
      });
    }
  }

  return getAccountHandler;
}
module.exports = getAccountHandlerFcomposer;
