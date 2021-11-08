function putDepositHandlerFcomposer(diHash) {
  const { dataMock } = diHash;
  const { depositList } = dataMock;
  async function putDepositHandler(req, res) {
    try {
      const deposit = depositList.find((item) => (item.id).toString() === req.params.id);
      deposit.status = req.body.status;
      deposit.confirmedAmount = req.body.confirmedAmount;
      res.status(200).send({
        deposit,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return putDepositHandler;
}

module.exports = putDepositHandlerFcomposer;
