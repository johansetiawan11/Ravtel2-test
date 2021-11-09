function postProductHandlerFcomposer(diHash) {
  const { dataMock } = diHash;
  const { productList } = dataMock;
  async function postProductHandler(req, res) {
    try {
      const newProduct = {
        id: productList[productList.length - 1].id + 1,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        performanceFee: req.body.performanceFee,
        penaltyFee: req.body.penaltyFee,
        created_at: new Date(Date.now()).toLocaleString().split(",")[0],
        created_by: 1,
        updated_at: new Date(Date.now()).toLocaleString().split(",")[0],
        updated_by: 1,
        deleted_at: null,
        deleted_by: null,
      };
      productList.push(newProduct);
      res.status(200).send({
        Product: newProduct,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return postProductHandler;
}

module.exports = postProductHandlerFcomposer;
