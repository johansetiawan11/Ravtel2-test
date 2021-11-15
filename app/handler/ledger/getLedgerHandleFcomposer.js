const errorSid = require("../../const/errorSid");

function getLedgerHandlerFcomposer(diHash) {
  const {
    dbModelHash,
    objection,
  } = diHash;
  const {
    Ledger,
  } = dbModelHash;
  const {
    DataError,
  } = objection;

  async function getLedgerHandler(req, res) {
    try {
      const params = req.params;
      const ledgerId = params.id;

      const ledgerQueryResponse = await Ledger
      .query()
      .where("id", ledgerId)
      .whereNull("deleted_at");
      if (!(ledgerQueryResponse && (ledgerQueryResponse.length > 0))) {
        return res.status(404).send({
          message: errorSid.GET_LEDGER_HANDLER_LEDGER_RECORD_NOT_FOUND,
        });
      }
      const ledgerRecord = ledgerQueryResponse[0];

      return res.status(200).json({
        data: ledgerRecord,
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
          message: errorSid.GET_LEDGER_HANDLER_ID_INVALID,
          debugInfo,
        });
      }

      return res.status(503).send({
        message: errorSid.GET_LEDGER_HANDLER_OPERATION_FAILED,
        debugInfo: err.message,
      });
    }
  }

  return getLedgerHandler;
}

module.exports = getLedgerHandlerFcomposer;
