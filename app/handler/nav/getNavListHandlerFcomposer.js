function getNavListHandlerFcomposer(diHash) {
  async function getNavListHandler(req, res) {
    const { dataMock } = diHash;
    const { navList } = dataMock;
    try {
      res.status(200).json({
        nav: navList,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return getNavListHandler;
}

module.exports = getNavListHandlerFcomposer;
