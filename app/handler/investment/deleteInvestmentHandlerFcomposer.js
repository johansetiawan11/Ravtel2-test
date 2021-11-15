const errorSid = require("../../const/errorSid");

function deleteInvestmentHandlerFcomposer(diHash) {
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

  async function deleteInvestmentHandler(req, res) {
    try {
      const params = req.params;
      const investmentId = params.id;

      const investmentIdQueryResponse = await Investment
      .query()
      .where("id", investmentId)
      .whereNull("deleted_at");
      if (!(investmentIdQueryResponse && (investmentIdQueryResponse.length > 0))) {
        return res.status(404).send({
          message: errorSid.DELETE_INVESTMENT_HANDLER_INVESTMENT_RECORD_NOT_FOUND,
        });
      }
      const existingInvestmentRecord = investmentIdQueryResponse[0];
      const existingInvestmentRecordId = existingInvestmentRecord.id;

      const investmentUpdateArgHash = {
        deleted_at: new Date().toISOString(),
        deleted_by: "system",
      };

      const investmentUpdateResponse = await Investment
      .query()
      .patchAndFetchById(existingInvestmentRecordId, investmentUpdateArgHash);

      return res.status(200).json({
        data: investmentUpdateResponse,
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
          message: errorSid.DELETE_INVESTMENT_HANDLER_ID_INVALID,
          debugInfo,
        });
      }

      return res.status(503).send({
        message: errorSid.DELETE_INVESTMENT_HANDLER_OPERATION_FAILED,
        debugInfo: err.message,
      });
    }
  }

  return deleteInvestmentHandler;
}

module.exports = deleteInvestmentHandlerFcomposer;
