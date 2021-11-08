function getDepositListHandlerFcomposer(diHash) {
  async function getDepositListHandler(req, res) {
    const { dataMock } = diHash;
    const { depositList, accountList } = dataMock;
    const result = [];
    depositList.forEach((item) => {
      const account = accountList.find((client) => client.id === item.accountId);
      let data = {};
      if (account.name) {
        data = { ...item, name: account.name };
      } else {
        data = { ...item, name: account.companyName };
      }
      result.push(data);
    });
    try {
      res.status(200).json({
        deposit: result,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return getDepositListHandler;
}

module.exports = getDepositListHandlerFcomposer;
