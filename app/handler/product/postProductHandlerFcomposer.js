const errorSid = require("../../const/errorSid");

function postProductHandlerFcomposer(diHash) {
  const {
    dbModelHash,
    objection,
  } = diHash;
  const {
    Product,
  } = dbModelHash;
  const {
    UniqueViolationError,
  } = objection;

  async function postProductHandler(req, res) {
    try {
      const body = req.body;
      const productName = body.productName;
      const llcProductName = productName.toLocaleLowerCase();

      const productQueryResponse = await Product
      .query()
      .where("product_name", llcProductName);
      if (productQueryResponse && (productQueryResponse.length > 0)) {
        return res.status(409).send({
          message: errorSid.POST_PRODUCT_HANDLER_NAME_CONFLICTED,
        });
      }

      const productInsertArgHash = {
        product_name: llcProductName,
        product_description: body.productDescription,
        performance_fee: body.performanceFee,
        penalty_fee: body.penaltyFee,
        created_at: new Date().toISOString(),
        created_by: "system",

      };
      const productInsertResponse = await Product
      .query()
      .insert(productInsertArgHash);

      return res.status(200).json({
        data: productInsertResponse,
      });
    } catch (err) {
      console.error(err);

      let debugInfo;

      if (err instanceof UniqueViolationError) {
        if (err.constraint) {
          debugInfo = {
            constraint: err.constraint,
          };
        }

        return res.status(409).send({
          message: errorSid.POST_PRODUCT_HANDLER_OPERATION_CONFLICTED,
          debugInfo,
        });
      }

      return res.status(503).send({
        message: errorSid.POST_PRODUCT_HANDLER_OPERATION_FAILED,
        debugInfo: err.message,
      });
    }
  }

  return postProductHandler;
}

module.exports = postProductHandlerFcomposer;
