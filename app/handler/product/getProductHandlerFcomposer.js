function getProductHandlerFcomposer(diHash) {
  const { dataMock } = diHash;
  const { productList } = dataMock;
  async function getProductHandler(req, res) {
    const product = productList.find((item) => item.id === req.params.id);
    try {
      res.status(200).json({
        data: {
          ...product,
        },
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }
  return getProductHandler;
}
module.exports = getProductHandlerFcomposer;
