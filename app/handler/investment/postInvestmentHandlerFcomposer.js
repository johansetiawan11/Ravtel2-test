const errorSid = require("../../const/errorSid");

function postInvestmentHandlerFcomposer(diHash) {
  const {
    dbModelHash,
    objection,
  } = diHash;
  const {
    Investment,
  } = dbModelHash;
  const {
    UniqueViolationError,
  } = objection;
  async function postInvestmentHandler(req, res) {
    try {
      const body = req.body;
      const investmentInsertArgHash = {
        account_id: body.accountId,
        product_id: body.productId,
        last_unit_amount: req.body.lastUnitAmount,
        hwm: body.hwm,
        performance_fee_percent: body.performanceFeePercent,
        penalty_fee_percent: body.penaltyFeePercent,
        investment_date: body.invesmentDate,
        next_performance_fee_date: body.nextPerformanceFeeDate,
        maturity_date: body.maturityDate,
        created_at: new Date().toISOString(),
        created_by: "system",
      };

      const investmentInsertResponse = await Investment
      .query()
      .insert(investmentInsertArgHash);

      // Refetch the record to populate uuid, etc
      const investRefetchResponse = await investmentInsertResponse.$query();

      /**
      * NOTE: waiting for ui investment.
      * TODO: insert to tabel investmentActivity.
      */

      //  const newInvestmentActivity = {
      //   investmentId: newInvestment.id,
      //   activityType: "investment",
      //   unitAmount: "30000",
      //   hwm: "2500",
      //   currency: "IDR",
      //   currencyAmount: "10000",
      //   description: "investment test",
      //   created_at: new Date(Date.now()).toLocaleString().split(",")[0],
      //   created_by: 1,
      //  };

      return res.status(200).json({
        data: investRefetchResponse,
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
          message: errorSid.POST_INVESTMENT_HANDLER_OPERATION_CONFLICTED,
          debugInfo,
        });
      }

      return res.status(503).send({
        message: errorSid.POST_INVESTMENT_HANDLER_OPERATION_FAILED,
        debugInfo: err.message,
      });
    }
  }

  return postInvestmentHandler;
}

module.exports = postInvestmentHandlerFcomposer;
