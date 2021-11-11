const dbTableName = require("../../const/dbTableName");
const errorSid = require("../../const/errorSid");

function getAccountListHandlerFcomposer(diHash) {
  const {
    dbModelHash,
    sqlCommon,
  } = diHash;
  const {
    Account,
  } = dbModelHash;

  async function getAccountListHandler(req, res) {
    try {
      const query = req.query;
      const pageNumber = sqlCommon.sanitizePageNumber(query.page);
      const pageLength = sqlCommon.sanitizePageLength(query.length);
      const sortDirection = sqlCommon.sanitizeSortDirection(query.direction);
      const orderByRawSql = `${dbTableName.ACCOUNT}.id ${sortDirection} NULLS LAST`;

      const accountQueryResponse = await Account
      .query()
      .orderByRaw(orderByRawSql)
      .page(pageNumber - 1, pageLength);

      return res.status(200).json({
        data: {
          records: accountQueryResponse.results,
          total: accountQueryResponse.total,
        },
      });
    } catch (err) {
      console.error(err);

      return res.status(503).send({
        message: errorSid.GET_ACCOUNT_LIST_HANDLER_OPERATION_FAILED,
        debugInfo: err.message,
      });
    }
  }

  return getAccountListHandler;
}

module.exports = getAccountListHandlerFcomposer;
