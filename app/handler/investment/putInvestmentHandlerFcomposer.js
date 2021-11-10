function putInvestmentHandlerFcomposer(diHash) {
  const { dataMock } = diHash;
  const { investmentList } = dataMock;
  async function putInvestmentHandler(req, res) {
    const investment = investmentList.find((item) => (item.id).toString() === req.params.id);
    try {
      investment.accountId = req.body.accountId;
      investment.productId = req.body.productId;
      investment.lastUnitAmount = req.body.lastUnitAmount;
      investment.hwm = req.body.hwm;
      investment.performanceFeePercent = req.body.performanceFeePercent;
      investment.penaltyFeePercent = req.body.penaltyFeePercent;
      investment.invesmentDate = req.body.invesmentDate;
      investment.nextPerformanceFeeDate = req.body.nextPerformanceFeeDate;
      investment.maturityDate = req.body.maturityDate;
      investment.updated_at = new Date(Date.now()).toLocaleString().split(",")[0];

      res.status(200).send({
        investment,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return putInvestmentHandler;
}

module.exports = putInvestmentHandlerFcomposer;
