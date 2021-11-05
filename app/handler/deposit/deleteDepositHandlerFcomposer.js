function deleteDepositHandlerFcomposer(diHash) {
  async function deleteDepositHandler(req, res) {
    const { dataMock } = diHash;
    const { depositList } = dataMock;
    try {
      const deposit = depositList.find((item) => (item.id).toString() === req.params.id);
      depositList.splice(+deposit.id - 1, 1);
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
  return deleteDepositHandler;
}

module.exports = deleteDepositHandlerFcomposer;
