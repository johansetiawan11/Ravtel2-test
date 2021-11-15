const errorSid = require("../../const/errorSid");

function putInvestmentHandlerFcomposer(diHash) {
  const {
    dbModelHash,
    objection,
  } = diHash;
  const {
    Investment,
  } = dbModelHash;
  const {
    DataError,
    UniqueViolationError,
  } = objection;

  async function putInvestmentHandler(req, res) {
    try {
      const params = req.params;
      const investmentId = params.id;
      const body = req.body;

      const investmentUuidQueryResponse = await Investment
      .query()
      .where("id", investmentId)
      .whereNull("deleted_at");
      if (!(investmentUuidQueryResponse && (investmentUuidQueryResponse.length > 0))) {
        return res.status(404).send({
          message: errorSid.PUT_investment_HANDLER_investment_RECORD_NOT_FOUND,
        });
      }
      const existinginvestmentRecord = investmentUuidQueryResponse[0];
      const existinginvestmentRecordId = existinginvestmentRecord.id;

      const investmentUpdateArgHash = {
        account_id: body.accountId,
        product_id: body.productId,
        last_unit_amount: req.body.lastUnitAmount,
        hwm: body.hwm,
        performance_fee_percent: body.performanceFeePercent,
        penalty_fee_percent: body.penaltyFeePercent,
        investment_date: body.invesmentDate,
        next_performance_fee_date: body.nextPerformanceFeeDate,
        maturity_date: body.maturityDate,
        updated_at: new Date().toISOString(),
        updated_by: "system",
      };
      const investmentUpdateResponse = await Investment
      .query()
      .patchAndFetchById(existinginvestmentRecordId, investmentUpdateArgHash);

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
          message: errorSid.PUT_INVESTMENT_HANDLER_ID_INVALID,
          debugInfo,
        });
      } else if (err instanceof UniqueViolationError) {
        if (err.constraint) {
          debugInfo = {
            constraint: err.constraint,
          };
        }

        return res.status(409).send({
          message: errorSid.PUT_INVESTMENT_HANDLER_OPERATION_CONFLICTED,
          debugInfo,
        });
      }

      return res.status(503).send({
        message: errorSid.PUT_INVESTMENT_HANDLER_OPERATION_FAILED,
        debugInfo: err.message,
      });
    }
  }

  return putInvestmentHandler;
}

module.exports = putInvestmentHandlerFcomposer;
