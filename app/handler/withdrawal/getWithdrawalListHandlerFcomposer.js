function getWithdrawalListHandlerFcomposer(diHash) {
  async function getWithdrawalListHandler(req, res) {
    const { dataMock } = diHash;
    const { accountList, withdrawalList } = dataMock;
    try {
      const result = [];
      withdrawalList.forEach((item) => {
        const account = accountList.find((client) => client.id === item.accountId);
        let data = {};
        if (account.name) {
          data = { ...item, name: account.name };
        } else {
          data = { ...item, name: account.companyName };
        }
        result.push(data);
      });
      res.status(200).json({
        withdrawal: result,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return getWithdrawalListHandler;
}

module.exports = getWithdrawalListHandlerFcomposer;
