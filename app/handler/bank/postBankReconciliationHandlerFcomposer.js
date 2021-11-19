function postBankReconciliationHandlerFcomposer(diHash) {
  const { csvtojson, attachmentFsCommon, attachmentFsCommonAdapter } = diHash;

  async function postBankReconciliationHandler(req, res) {
    try {
      let storageResponse;
      let csvJson;
      if (req.files && (req.files.length > 0)) {
        const reqFile = req.files[0];
        const reqFileMimeType = reqFile.mimetype;
        const reqFileExtension = attachmentFsCommon.getFileExtension(reqFileMimeType); // Only allow certain MIME types
        if (reqFileExtension) {
          storageResponse = await attachmentFsCommonAdapter.moveReqFileToStorage(reqFile)
          .catch((err) => {
            console.error(err);
            res.status(500).send({
              message: err.message,
            });
          });
        }
        csvJson = await csvtojson({
          trim: true, delimiter: "auto", checkType: true,
        }).fromString(req.files[0].buffer.toString());

      }
      // TODO save value to database

      res.status(200).send({
        file: storageResponse.s3Response.Location,
        csv: csvJson,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }

  return postBankReconciliationHandler;
}
module.exports = postBankReconciliationHandlerFcomposer;
