function getAccountHandlerFcomposer(diHash) {
  const { dataMock } = diHash;
  const { accountList, bankList } = dataMock;
  async function getAccountHandler(req, res) {
    const account = accountList.find((item) => item.id === req.params.id);
    const bank = bankList.find((item) => item.accountId === req.params.id);
    try {
      res.status(200).json({
        data: {
          ...account,
          ...bank,
        }
        ,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }
  return getAccountHandler;
}
module.exports = getAccountHandlerFcomposer;
