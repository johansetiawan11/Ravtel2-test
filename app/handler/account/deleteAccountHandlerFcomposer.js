function deleteAccountHandlerFcomposer(diHash) {
  async function deleteAccountHandler(req, res) {
    const { dataMock } = diHash;
    const { accountList, bankList } = dataMock;
    try {
      accountList.splice(+req.params.id - 1, 1);
      bankList.splice(+req.params.id - 1, 1);
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
  return deleteAccountHandler;
}
module.exports = deleteAccountHandlerFcomposer;
