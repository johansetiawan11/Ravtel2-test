const errorSid = require("../../const/errorSid");

function getUserHandlerFcomposer(diHash) {
  const {
    dbModelHash,
    objection,
  } = diHash;
  const {
    User,
  } = dbModelHash;
  const {
    DataError,
  } = objection;

  async function getUserHandler(req, res) {
    try {
      const params = req.params;
      const userUuid = params.uuid;

      const userQueryResponse = await User
      .query()
      .where("uuid", userUuid)
      .whereNull("deleted_at");
      if (!(userQueryResponse && (userQueryResponse.length > 0))) {
        return res.status(404).send({
          message: errorSid.GET_USER_HANDLER_USER_RECORD_NOT_FOUND,
        });
      }
      const userRecord = userQueryResponse[0];

      return res.status(200).json({
        data: userRecord, // TODO: Obscure user.id
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
          message: errorSid.GET_USER_HANDLER_UUID_INVALID,
          debugInfo,
        });
      }

      return res.status(503).send({
        message: errorSid.GET_USER_HANDLER_OPERATION_FAILED,
        debugInfo: err.message,
      });
    }
  }

  return getUserHandler;
}

module.exports = getUserHandlerFcomposer;
