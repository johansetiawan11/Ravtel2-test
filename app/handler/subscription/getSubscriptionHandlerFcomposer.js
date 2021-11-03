function getSubscriptionHandlerFcomposer(diHash) {
  const { dataMock } = diHash;
  const { subscriptionList } = dataMock;
  async function getSubscriptionHandler(req, res) {
    const subscription = subscriptionList.find((item) => item.accountId === req.params.id);
    try {
      res.status(200).json({
        subscription,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return getSubscriptionHandler;
}

module.exports = getSubscriptionHandlerFcomposer;
