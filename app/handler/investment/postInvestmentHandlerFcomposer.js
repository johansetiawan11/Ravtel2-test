function postInvestmentHandlerFcomposer(diHash) {
  const { dataMock } = diHash;
  const { investmentList, investmentActivity } = dataMock;
  async function postInvestmentHandler(req, res) {
    try {
      const newInvestment = {
        id: investmentList[investmentList.length - 1].id + 1,
        accountId: req.body.accountId,
        productId: req.body.productId,
        lastUnitAmount: req.body.lastUnitAmount,
        hwm: req.body.hwm,
        performanceFeePercent: req.body.performanceFeePercent,
        penaltyFeePercent: req.body.penaltyFeePercent,
        invesmentDate: req.body.invesmentDate,
        nextPerformanceFeeDate: req.body.nextPerformanceFeeDate,
        maturityDate: req.body.maturityDate,
        created_at: new Date(Date.now()).toLocaleString().split(",")[0],
        created_by: 1,
        updated_at: null,
        updated_by: 1,
        deleted_at: null,
        deleted_by: null,
      };
      const newInvestmentActivity = {
        id: investmentActivity[investmentActivity.length - 1].id + 1,
        investmentId: newInvestment.id,
        activityType: "investment",
        unitAmount: "30000",
        hwm: "2500",
        currency: "IDR",
        currencyAmount: "10000",
        description: "investment test",
        created_at: new Date(Date.now()).toLocaleString().split(",")[0],
        created_by: 1,
      };
      investmentList.push(newInvestment);
      investmentActivity.push(newInvestmentActivity);
      res.status(200).send({
        investment: newInvestment,
        investmentActivity: investmentActivity,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return postInvestmentHandler;
}

module.exports = postInvestmentHandlerFcomposer;
