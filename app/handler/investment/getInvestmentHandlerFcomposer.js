const errorSid = require("../../const/errorSid");

function getInvestmentHandlerFcomposer(diHash) {
  const {
    dbModelHash,
    objection,
  } = diHash;
  const {
    Investment,
  } = dbModelHash;
  const {
    DataError,
  } = objection;

  async function getInvestmentHandler(req, res) {
    try {
      const params = req.params;
      const investmentId = params.id;

      const investmentQueryResponse = await Investment
      .query()
      .where("id", investmentId)
      .whereNull("deleted_at");
      if (!(investmentQueryResponse && (investmentQueryResponse.length > 0))) {
        return res.status(404).send({
          message: errorSid.GET_INVESTMENT_HANDLER_INVESTMENT_RECORD_NOT_FOUND,
        });
      }
      const investmentRecord = investmentQueryResponse[0];

      return res.status(200).json({
        data: investmentRecord,
      });
    } catch (err) {
      console.error(err);

      let debugInfo;

      if (err instanceof DataError) {
        if (
          err.nativeError
          && err.nativeError.routine
        ) {
          debugInfo = {
            routine: err.nativeError.routine,
          };
        }

        return res.status(400).send({
          message: errorSid.GET_INVESTMENT_HANDLER_ID_INVALID,
          debugInfo,
        });
      }

      return res.status(503).send({
        message: errorSid.GET_INVESTMENT_HANDLER_OPERATION_FAILED,
        debugInfo: err.message,
      });
    }
  }

  return getInvestmentHandler;
}

module.exports = getInvestmentHandlerFcomposer;
