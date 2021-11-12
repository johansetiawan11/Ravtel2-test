const errorSid = require("../../const/errorSid");

function putProductHandlerFcomposer(diHash) {
  const {
    dbModelHash,
    objection,
  } = diHash;
  const {
    Product,
  } = dbModelHash;
  const {
    DataError,
    UniqueViolationError,
  } = objection;

  async function putProductHandler(req, res) {
    try {
      const params = req.params;
      const productId = params.id;
      const body = req.body;
      const productName = body.productName;
      const llcProductName = productName.toLocaleLowerCase();

      const productIdQueryResponse = await Product
      .query()
      .where("id", productId)
      .whereNull("deleted_at");
      if (!(productIdQueryResponse && (productIdQueryResponse.length > 0))) {
        return res.status(404).send({
          message: errorSid.PUT_PRODUCT_HANDLER_PRODUCT_RECORD_NOT_FOUND,
        });
      }
      const existingProductRecord = productIdQueryResponse[0];
      const existingProductRecordId = existingProductRecord.id;
      const existingProductRecordName = existingProductRecord.productName;

      if (existingProductRecordName !== llcProductName) {
        const productNameQueryResponse = await Product
        .query()
        .where("product_name", llcProductName);
        if (productNameQueryResponse && (productNameQueryResponse.length > 0)) {
          return res.status(409).send({
            message: errorSid.PUT_PRODUCT_HANDLER_NAME_CONFLICTED,
          });
        }
      }

      const productUpdateArgHash = {
        product_name: llcProductName,
        product_description: body.productDescription,
        performance_fee: body.performanceFee,
        penalty_fee: body.penaltyFee,
        updated_at: new Date().toISOString(),
        updated_by: "system",
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
          message: errorSid.PUT_PRODUCT_HANDLER_ID_INVALID,
          debugInfo,
        });
      } else if (err instanceof UniqueViolationError) {
        if (err.constraint) {
          debugInfo = {
            constraint: err.constraint,
          };
        }

        return res.status(409).send({
          message: errorSid.PUT_PRODUCT_HANDLER_OPERATION_CONFLICTED,
          debugInfo,
        });
      }

      return res.status(503).send({
        message: errorSid.PUT_PRODUCT_HANDLER_OPERATION_FAILED,
        debugInfo: err.message,
      });
    }
  }

  return putProductHandler;
}

module.exports = putProductHandlerFcomposer;
