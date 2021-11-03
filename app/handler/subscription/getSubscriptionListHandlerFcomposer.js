function getSubscriptionListHandlerFcomposer(diHash) {
  async function getSubscriptionListHandler(req, res) {
    const { dataMock } = diHash;
    const { subscriptionList } = dataMock;
    try {
      res.status(200).json({
        subscription: subscriptionList,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return getSubscriptionListHandler;
}

module.exports = getSubscriptionListHandlerFcomposer;
