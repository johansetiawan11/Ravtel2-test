function getInvestmentListHandlerFcomposer(diHash) {
  async function getInvestmentListHandler(req, res) {
    const { dataMock } = diHash;
    const { investmentList } = dataMock;
    const query = req.query;
    try {
      if (Object.keys(query).length > 0) {
        const data = investmentList.filter(
          (obj) => (obj.accountId === query["account-id"]),
        );
        res.status(200).json({
          count: data.length,
          investment: data,
        });
      } else {
        res.status(200).json({
          count: investmentList.length,
          investment: investmentList,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }
  return getInvestmentListHandler;
}

module.exports = getInvestmentListHandlerFcomposer;
