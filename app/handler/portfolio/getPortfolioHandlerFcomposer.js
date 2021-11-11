function getPortfolioHandlerFcomposer(diHash) {
  async function getPortfolioHandler(req, res) {
    const { dataMock } = diHash;
    const { subscriptionList, depositList } = dataMock;
    try {
      let dataInfo = {};
      const accountSubsInfo = subscriptionList
      .filter((subs) => subs.accountId === req.params.id)
      .reduce((before, subs) => {
        if (before.unit === undefined || before.nav === undefined) {
          return [before[0] + +subs.unit, before[1] + +subs.nav, before[2] + +subs.amount];
        }
        return [+before.unit + +subs.unit, +before.nav + +subs.nav, +before.amount + +subs.amount];
      });
      const amount = depositList
      .filter((deposit) => deposit.accountId === req.params.id)
      .reduce((before, deposit) => {
        if (before.amount === undefined) {
          return +before + +deposit.amount;
        }
        return +before.amount + +deposit.amount;
      }, 0);
      if (accountSubsInfo.length > 1) {
        dataInfo = {
          subsInfo: accountSubsInfo,
          amount,
        };
      } else {
        const subsInfo = [accountSubsInfo.unit, accountSubsInfo.nav, accountSubsInfo.amount];
        dataInfo = {
          subsInfo,
          amount,
        };
      }
      const getSubs = subscriptionList.filter((item) => item.accountId === req.params.id);
      res.status(200).json({
        subscription: getSubs,
        dataInfo,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return getPortfolioHandler;
}

module.exports = getPortfolioHandlerFcomposer;
