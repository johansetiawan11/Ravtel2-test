function postDepositHandlerFcomposer(diHash) {
  const { dataMock, attachmentFsCommon, attachmentFsCommonAdapter } = diHash;
  const { depositList } = dataMock;
  async function postDepositHandler(req, res) {
    try {
      let storageResponse;
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
      }
      const indexLast = depositList.length - 1;
      const newDeposit = {
        id: +depositList[indexLast].id + 1,
        accountId: req.body.accountId,
        product: req.body.product,
        depositDate: req.body.depositDate,
        currency: req.body.currency,
        amount: req.body.amount,
        maturity: req.body.amount,
        depositProff: storageResponse,
        status: req.body.status,
        confirmedAmount: req.body.confirmedAmount,
        createdAt: new Date(Date.now()).toLocaleString().split(",")[0],
        updatedAt: null,
      };
      depositList.push(newDeposit);
      res.status(200).send({
        deposit: newDeposit,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return postDepositHandler;
}

module.exports = postDepositHandlerFcomposer;
