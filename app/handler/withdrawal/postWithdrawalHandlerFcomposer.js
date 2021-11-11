function postWithdrawalHandlerFcomposer(diHash) {
  const { dataMock } = diHash;
  const { withdrawalList } = dataMock;
  async function postWithdrawalHandler(req, res) {
    try {
      const latestIndex = withdrawalList.length - 1;
      const newWithdrawal = {
        id: +withdrawalList[latestIndex].id + 1,
        accountId: req.body.accountId,
        amount: req.body.amount,
        product: req.body.product,
        withdrawDate: new Date(Date.now()).toLocaleString().split(",")[0],
        createdAt: new Date(Date.now()).toLocaleString().split(",")[0],
        targetDate: null,
        sla: "-",
        status: "NEW",
      };

      withdrawalList.push(newWithdrawal);
      res.status(200).send({
        user: newWithdrawal,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return postWithdrawalHandler;
}

module.exports = postWithdrawalHandlerFcomposer;
