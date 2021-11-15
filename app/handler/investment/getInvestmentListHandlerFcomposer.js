const dbTableName = require("../../const/dbTableName");
const errorSid = require("../../const/errorSid");

function getInvestmentListHandlerFcomposer(diHash) {
  const {
    dbModelHash,
    sqlCommon,
  } = diHash;
  const {
    Investment,
  } = dbModelHash;

  async function getInvestmentListHandler(req, res) {
    try {
      const query = req.query;
      const pageNumber = sqlCommon.sanitizePageNumber(query.page);
      const pageLength = sqlCommon.sanitizePageLength(query.length);
      const sortDirection = sqlCommon.sanitizeSortDirection(query.direction);
      const orderByRawSql = `${dbTableName.INVESTMENT}.id ${sortDirection} NULLS LAST`;

      const investmentQueryResponse = await Investment
      .query()
      .whereNull("deleted_at")
      .orderByRaw(orderByRawSql)
      .page(pageNumber - 1, pageLength)
      .where((q) => {
        if (query["s-account-id"]) {
          q.andWhere("account_id", query["s-account-id"]);
        }
      });

      return res.status(200).json({
        data: {
          records: investmentQueryResponse.results,
          total: investmentQueryResponse.total,
        },
      });
    } catch (err) {
      console.error(err);

      return res.status(503).send({
        message: errorSid.GET_INVESTMENT_LIST_HANDLER_OPERATION_FAILED,
        debugInfo: err.message,
      });
    }
  }

  return getInvestmentListHandler;
}

module.exports = getInvestmentListHandlerFcomposer;
