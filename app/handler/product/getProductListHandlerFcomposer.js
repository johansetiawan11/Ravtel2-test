function getProductListHandlerFcomposer(diHash) {
  async function getProductListHandler(req, res) {
    const { dataMock } = diHash;
    const { productList } = dataMock;
    const query = req.query;
    try {
      if (Object.keys(query).length > 0) {
        const data = productList.filter(
          (obj) => (obj.productName === query["product-name"]),
        );
        res.status(200).json({
          count: data.length,
          product: data,
        });
      } else {
        res.status(200).json({
          count: productList.length,
          product: productList,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }
  return getProductListHandler;
}

module.exports = getProductListHandlerFcomposer;
