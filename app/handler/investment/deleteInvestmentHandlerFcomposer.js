function deleteInvestmentHandlerFcomposer(diHash) {
  async function deleteInvestmentHandler(req, res) {
    const { dataMock } = diHash;
    const { investmentList } = dataMock;
    try {
      const investment = investmentList.find((item) => (item.id).toString() === req.params.id);
      investmentList.splice(+investment.id - 1, 1);
      res.status(200).send({
        message: "Deleted Complete",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
      });
    }
  }
  return deleteInvestmentHandler;
}
module.exports = deleteInvestmentHandlerFcomposer;
