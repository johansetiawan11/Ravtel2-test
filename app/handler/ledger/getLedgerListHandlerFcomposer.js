function getLedgerListHandlerFcomposer(diHash) {
  async function getLedgerListHandler(req, res) {
    const { dataMock } = diHash;
    const { ledgerList } = dataMock;
    const query = req.query;
    try {
      if (Object.keys(query).length > 0) {
        const data = ledgerList.filter(
          (obj) => (obj.accound_id === query["s-account-id"]) || (obj.info === query.s) || (obj.transaction_date >= query["s-start-date"] && obj.transaction_date <= query["s-end-date"]),
        );
        res.status(200).json({
          count: data.length,
          page: 1,
          ledger: data,
        });
      } else {
        res.status(200).json({
          count: ledgerList.length,
          page: 1,
          ledger: ledgerList,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return getLedgerListHandler;
}

module.exports = getLedgerListHandlerFcomposer;
