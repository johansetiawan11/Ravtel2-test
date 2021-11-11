function postBankReconciliationPreviewHandlerFcomposer(diHash) {
  const { csvtojson } = diHash;
  async function postBankReconciliationPreviewHandler(req, res) {
    try {
      if (
        req.files
        && (req.files.length > 0)
      ) {
        /**
          * NOTE: just csv is not messy can to convert json.
          * TODO: create function to stripCSV messy.
          */
        const dataCSV = await csvtojson({
          trim: true, delimiter: "auto", checkType: true,
        }).fromString(req.files[0].buffer.toString());

        res.status(200).send({
          message: "Uploaded the file successfully",
          data: {
            account_id: req.body.account_id,
            transaction_date: req.body.transaction_date,
            name: req.body.name,
            column: Object.keys(dataCSV[0]),
            data: dataCSV,
          },
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  return postBankReconciliationPreviewHandler;
}
module.exports = postBankReconciliationPreviewHandlerFcomposer;
