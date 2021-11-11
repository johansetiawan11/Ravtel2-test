const dbTableName = require("../../const/dbTableName");
const errorSid = require("../../const/errorSid");

function getUserListHandlerFcomposer(diHash) {
  const {
    dbModelHash,
    sqlCommon,
  } = diHash;
  const {
    User,
  } = dbModelHash;

  async function getUserListHandler(req, res) {
    try {
      const query = req.query;
      const pageNumber = sqlCommon.sanitizePageNumber(query.page);
      const pageLength = sqlCommon.sanitizePageLength(query.length);
      const sortDirection = sqlCommon.sanitizeSortDirection(query.direction);
      const orderByRawSql = `${dbTableName.USERS}.id ${sortDirection} NULLS LAST`;

      const userQueryResponse = await User
      .query()
      .whereNull("deleted_at")
      .orderByRaw(orderByRawSql)
      .page(pageNumber - 1, pageLength);

      return res.status(200).json({
        data: {
          records: userQueryResponse.results, // TODO: Obscure user.id
          total: userQueryResponse.total,
        },
      });
    } catch (err) {
      console.error(err);

      return res.status(503).send({
        message: errorSid.GET_USER_LIST_HANDLER_OPERATION_FAILED,
        debugInfo: err.message,
      });
    }
  }

  return getUserListHandler;
}

module.exports = getUserListHandlerFcomposer;
