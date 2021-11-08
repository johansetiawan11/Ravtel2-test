function postLedgerHandlerFcomposer(diHash) {
  const { dataMock } = diHash;
  const { ledgerList } = dataMock;
  async function postLedgerHandler(req, res) {
    try {
      const params = {
        id: ledgerList.length + 1,
        accound_id: 2,
        event_code: req.body.event_code,
        transaction_date: new Date(Date.now()).toLocaleString().split(",")[0],
        credit: req.body.credit,
        debit: req.body.debit,
      };
      ledgerList.push({
        ...params,
        balance: params.event_code === "credit" ? ledgerList[ledgerList.length - 1].balance + params.credit : ledgerList[ledgerList.length - 1].balance - params.debit,
        reference_table: params.event_code === "credit" ? "subscription" : "redemption",
        reference_id: params.event_code === "credit" ? "1" : "2",
      });

      res.status(200).send({
        message: "succesfuly created",
        ledger: ledgerList,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return postLedgerHandler;
}

module.exports = postLedgerHandlerFcomposer;
