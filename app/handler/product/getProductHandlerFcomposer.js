const errorSid = require("../../const/errorSid");

function getProductHandlerFcomposer(diHash) {
  const {
    dbModelHash,
    objection,
  } = diHash;
  const {
    Product,
  } = dbModelHash;
  const {
    DataError,
  } = objection;

  async function getProductHandler(req, res) {
    try {
      const params = req.params;
      const productId = params.id;

      const productQueryResponse = await Product
      .query()
      .where("id", productId)
      .whereNull("deleted_at");
      if (!(productQueryResponse && (productQueryResponse.length > 0))) {
        return res.status(404).send({
          message: errorSid.GET_PRODUCT_HANDLER_PRODUCT_RECORD_NOT_FOUND,
        });
      }
      const productRecord = productQueryResponse[0];

      return res.status(200).json({
        data: productRecord,
      });
    } catch (err) {
      console.error(err);

      let debugInfo;

      if (err instanceof DataError) {
        if (
          err.nativeError
          && err.nativeError.routine
        ) {
          debugInfo = {
            routine: err.nativeError.routine,
          };
        }

        return res.status(400).send({
          message: errorSid.GET_PRODUCT_HANDLER_ID_INVALID,
          debugInfo,
        });
      }

      return res.status(503).send({
        message: errorSid.GET_PRODUCT_HANDLER_OPERATION_FAILED,
        debugInfo: err.message,
      });
    }
  }

  return getProductHandler;
}

module.exports = getProductHandlerFcomposer;
