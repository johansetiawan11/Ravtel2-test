const errorSid = require("../../const/errorSid");

function postLedgerHandlerFcomposer(diHash) {
  const {
    dbModelHash,
    objection,
  } = diHash;
  const {
    Ledger,
  } = dbModelHash;
  const {
    UniqueViolationError,
  } = objection;

  async function postLedgerHandler(req, res) {
    try {
      const body = req.body;

      const ledgerInsertArgHash = {
        account_id: body.accountId,
        event_code: body.eventCode,
        transaction_date: new Date().toISOString(),
        info: body.info,
        credit: body.credit,
        debit: body.debit,
        created_at: new Date().toISOString(),
        created_by: "system",
      };

      const ledgerQueryResponse = await Ledger
      .query()
      .whereNull("deleted_at");

      const ledgerLast = ledgerQueryResponse[ledgerQueryResponse.length - 1];

      const ledgerInsertResponse = await Ledger
      .query()
      .insert({
        ...ledgerInsertArgHash,
        balance: body.eventCode === "credit" ? Number(ledgerQueryResponse.length > 0 ? ledgerLast.balance : 0) + body.credit : Number(ledgerQueryResponse.length > 0 ? ledgerLast.balance : 0) - body.debit,
        reference_table: body.eventCode === "credit" ? "deposit" : "withdrawal",
        reference_id: body.eventCode === "credit" ? "1" : "2",
      });

      const ledgerRefetchResponse = await ledgerInsertResponse.$query();

      return res.status(200).json({
        data: ledgerRefetchResponse,
      });
    } catch (err) {
      console.error(err);

      let debugInfo;

      if (err instanceof UniqueViolationError) {
        if (err.constraint) {
          debugInfo = {
            constraint: err.constraint,
          };
        }

        return res.status(409).send({
          message: errorSid.POST_LEDGER_HANDLER_OPERATION_CONFLICTED,
          debugInfo,
        });
      }

      return res.status(503).send({
        message: errorSid.POST_LEDGER_HANDLER_OPERATION_FAILED,
        debugInfo: err.message,
      });
    }
  }

  return postLedgerHandler;
}

module.exports = postLedgerHandlerFcomposer;

