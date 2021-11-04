function deleteNavHandlerFcomposer(diHash) {
  async function deleteNavHandler(req, res) {
    const { dataMock } = diHash;
    const { navList } = dataMock;
    try {
      const nav = navList.find((item) => (item.id).toString() === req.params.id);
      navList.splice(+nav.id - 1, 1);
      res.status(200).send({
        message: "Deleted Complete",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
      });
    }
  }
  return deleteNavHandler;
}

module.exports = deleteNavHandlerFcomposer;
