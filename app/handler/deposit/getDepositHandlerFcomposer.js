function getDepositHandlerFcomposer(diHash) {
  const { dataMock } = diHash;
  const { depositList, accountList } = dataMock;
  async function getDepositHandler(req, res) {
    const deposit = depositList.find((item) => (item.id).toString() === req.params.id);
    const account = accountList.find((item) => item.id === deposit.accountId);
    try {
      res.status(200).json({
        deposit: {
          ...deposit,
          name: account.name ? account.name : account.companyName,
        },
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return getDepositHandler;
}

module.exports = getDepositHandlerFcomposer;
