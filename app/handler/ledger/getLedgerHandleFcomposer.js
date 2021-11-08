function getLedgerHandlerFcomposer(diHash) {
  const { dataMock } = diHash;
  const { ledgerList } = dataMock;
  async function getLedgerHandler(req, res) {
    const user = ledgerList.find((item) => item.id === req.params.id);
    try {
      res.status(200).json({
        user,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return getLedgerHandler;
}

module.exports = getLedgerHandlerFcomposer;
