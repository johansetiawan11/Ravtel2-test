function getInvestmentHandlerFcomposer(diHash) {
  const { dataMock } = diHash;
  const { investmentList } = dataMock;
  async function getInvestmentHandler(req, res) {
    const investment = investmentList.find((item) => item.id === req.params.id);
    try {
      res.status(200).json({
        data: {
          ...investment,
        },
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }
  return getInvestmentHandler;
}
module.exports = getInvestmentHandlerFcomposer;
