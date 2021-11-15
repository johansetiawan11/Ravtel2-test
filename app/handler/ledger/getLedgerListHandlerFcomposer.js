const dbTableName = require("../../const/dbTableName");
const errorSid = require("../../const/errorSid");

function getLedgerListHandlerFcomposer(diHash) {
  const {
    dbModelHash,
    sqlCommon,
  } = diHash;
  const {
    Ledger,
  } = dbModelHash;

  async function getLedgerListHandler(req, res) {
    try {
      const query = req.query;
      const pageNumber = sqlCommon.sanitizePageNumber(query.page);
      const pageLength = sqlCommon.sanitizePageLength(query.length);
      const sortDirection = sqlCommon.sanitizeSortDirection(query.direction);
      const orderByRawSql = `${dbTableName.LEDGER}.id ${sortDirection} NULLS LAST`;

      const ledgerQueryResponse = await Ledger
      .query()
      .whereNull("deleted_at")
      .orderByRaw(orderByRawSql)
      .page(pageNumber - 1, pageLength)
      .where((q) => {
        if (query["s-account-id"]) {
          q.andWhere("account_id", query["s-account-id"]);
        }
        if (query["s-start-date"] && query["s-end-date"]) {
          q.andWhere("transaction_date", ">=", query["s-start-date"]);
          q.andWhere("transaction_date", "<", query["s-end-date"]);
        }

        if (query.s && query.s !== "") {
          q.andWhere((r) => {
            r.where("info", "like", `%${query.s}%`);
          });
        }
      });

      return res.status(200).json({
        data: {
          records: ledgerQueryResponse.results,
          total: ledgerQueryResponse.total,
        },
      });
    } catch (err) {
      console.error(err);

      return res.status(503).send({
        message: errorSid.GET_LEDGER_LIST_HANDLER_OPERATION_FAILED,
        debugInfo: err.message,
      });
    }
  }

  return getLedgerListHandler;
}

module.exports = getLedgerListHandlerFcomposer;
