function getAccountListHandlerFcomposer(diHash) {
  async function getAccountListHandler(req, res) {
    const { dataMock } = diHash;
    const { accountList } = dataMock;
    try {
      res.status(200).json({
        account: accountList,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }
  return getAccountListHandler;
}

module.exports = getAccountListHandlerFcomposer;
