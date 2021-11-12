const dbTableName = require("../../const/dbTableName");
const errorSid = require("../../const/errorSid");

function getProductListHandlerFcomposer(diHash) {
  const {
    dbModelHash,
    sqlCommon,
  } = diHash;
  const {
    Product,
  } = dbModelHash;

  async function getProductListHandler(req, res) {
    try {
      const query = req.query;
      const pageNumber = sqlCommon.sanitizePageNumber(query.page);
      const pageLength = sqlCommon.sanitizePageLength(query.length);
      const sortDirection = sqlCommon.sanitizeSortDirection(query.direction);
      const orderByRawSql = `${dbTableName.PRODUCT}.id ${sortDirection} NULLS LAST`;

      const productQueryResponse = await Product
      .query()
      .whereNull("deleted_at")
      .orderByRaw(orderByRawSql)
      .page(pageNumber - 1, pageLength)
      .where((q) => {
        if (query["s-product-name"] && query["s-product-name"] !== "") {
          q.andWhere((r) => {
            r.where("product_name", "like", `%${query["s-product-name"]}%`);
          });
        }
      });

      return res.status(200).json({
        data: {
          records: productQueryResponse.results,
          total: productQueryResponse.total,
        },
      });
    } catch (err) {
      console.error(err);

      return res.status(503).send({
        message: errorSid.GET_PRODUCT_LIST_HANDLER_OPERATION_FAILED,
        debugInfo: err.message,
      });
    }
  }

  return getProductListHandler;
}

module.exports = getProductListHandlerFcomposer;
