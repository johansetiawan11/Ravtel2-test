function getPortfolioListHandlerFcomposer(diHash) {
  async function getPortfolioListHandler(req, res) {
    const { dataMock } = diHash;
    const { subscriptionList, accountList, depositList } = dataMock;
    try {
      const portoList = [];
      accountList.forEach((item) => {
        const length = 1;
        const accountSubsInfo = subscriptionList
        .filter((subs) => subs.accountId === item.id)
        .reduce((before, subs) => {
          if (before.unit === undefined || before.nav === undefined) {
            return [+before[0] + +subs.unit, +before[1] + +subs.nav, length + 1];
          }
          return [+before.unit + +subs.unit, +before.nav + +subs.nav, length + 1];
        });
        const amount = depositList
        .filter((deposit) => deposit.accountId === item.id)
        .reduce((before, deposit) => {
          if (before.amount === undefined) {
            return +before + +deposit.amount;
          }
          return +before.amount + +deposit.amount;
        }, 0);
        if (accountSubsInfo.length > 1) {
          const data = {
            id: item.id,
            name: item.name || item.companyName,
            totalUnit: accountSubsInfo[0],
            subsLength: accountSubsInfo[2],
            avgNav: accountSubsInfo[1] / accountSubsInfo[2],
            balance: amount,
          };
          portoList.push(data);
        } else {
          const data = {
            id: item.id,
            name: item.name || item.companyName,
            totalUnit: accountSubsInfo.unit,
            subsLength: 1,
            avgNav: accountSubsInfo.nav,
            balance: amount,
          };
          portoList.push(data);
        }
      });
      res.status(200).json({
        portfolio: portoList,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return getPortfolioListHandler;
}

module.exports = getPortfolioListHandlerFcomposer;
