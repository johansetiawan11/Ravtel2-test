function putProductHandlerFcomposer(diHash) {
  const { dataMock } = diHash;
  const { productList } = dataMock;
  async function putProductHandler(req, res) {
    const product = productList.find((item) => (item.id).toString() === req.params.id);
    try {
      product.productName = req.body.productName;
      product.productDescription = req.body.productDescription;
      product.performanceFee = req.body.performanceFee;
      product.penaltyFee = req.body.penaltyFee;
      res.status(200).send({
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return putProductHandler;
}

module.exports = putProductHandlerFcomposer;
