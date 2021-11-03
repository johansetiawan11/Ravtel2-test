function putNavHandlerFcomposer(diHash) {
  const { dataMock } = diHash;
  const { navList } = dataMock;
  async function putNavHandler(req, res) {
    const nav = navList.find((item) => (item.id).toString() === req.params.id);
    try {
      nav.nav = req.body.nav;
      nav.date = req.body.date;
      res.status(200).send({
        nav,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return putNavHandler;
}

module.exports = putNavHandlerFcomposer;
