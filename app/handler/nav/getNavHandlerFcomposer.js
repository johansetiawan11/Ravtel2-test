function getNavHandlerFcomposer(diHash) {
  const { dataMock } = diHash;
  const { navList } = dataMock;
  async function getNavHandler(req, res) {
    const nav = navList.find((item) => (item.id).toString() === req.params.id);
    try {
      res.status(200).json({
        nav,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return getNavHandler;
}

module.exports = getNavHandlerFcomposer;
