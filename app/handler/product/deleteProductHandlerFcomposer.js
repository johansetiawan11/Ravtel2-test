const errorSid = require("../../const/errorSid");

function deleteProductHandlerFcomposer(diHash) {
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

  async function deleteProductHandler(req, res) {
    try {
      const params = req.params;
      const productId = params.id;

      const productIdQueryResponse = await Product
      .query()
      .where("id", productId)
      .whereNull("deleted_at");
      if (!(productIdQueryResponse && (productIdQueryResponse.length > 0))) {
        return res.status(404).send({
          message: errorSid.DELETE_PRODUCT_HANDLER_PRODUCT_RECORD_NOT_FOUND,
        });
      }
      const existingProductRecord = productIdQueryResponse[0];
      const existingProductRecordId = existingProductRecord.id;

      const productUpdateArgHash = {
        deleted_at: new Date().toISOString(),
        deleted_by: "system",
      };

      const productUpdateResponse = await Product
      .query()
      .patchAndFetchById(existingProductRecordId, productUpdateArgHash);

      return res.status(200).json({
        data: productUpdateResponse,
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
          message: errorSid.DELETE_PRODUCT_HANDLER_ID_INVALID,
          debugInfo,
        });
      }

      return res.status(503).send({
        message: errorSid.DELETE_PRODUCT_HANDLER_OPERATION_FAILED,
        debugInfo: err.message,
      });
    }
  }

  return deleteProductHandler;
}

module.exports = deleteProductHandlerFcomposer;
