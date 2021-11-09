function deleteProductHandlerFcomposer(diHash) {
  async function deleteProductHandler(req, res) {
    const { dataMock } = diHash;
    const { productList } = dataMock;
    try {
      const product = productList.find((item) => (item.id).toString() === req.params.id);
      productList.splice(+product.id - 1, 1);
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
  return deleteProductHandler;
}
module.exports = deleteProductHandlerFcomposer;
