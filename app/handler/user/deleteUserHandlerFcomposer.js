const errorSid = require("../../const/errorSid");

function deleteUserHandlerFcomposer(diHash) {
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

  async function deleteUserHandler(req, res) {
    try {
      const params = req.params;
      const userUuid = params.uuid;

      const userUuidQueryResponse = await User
      .query()
      .where("uuid", userUuid)
      .whereNull("deleted_at");
      if (!(userUuidQueryResponse && (userUuidQueryResponse.length > 0))) {
        return res.status(404).send({
          message: errorSid.DELETE_USER_HANDLER_USER_RECORD_NOT_FOUND,
        });
      }
      const existingUserRecord = userUuidQueryResponse[0];
      const existingUserRecordId = existingUserRecord.id;

      const userUpdateArgHash = {
        deleted_at: new Date().toISOString(),
        deleted_by: "system", // TODO: Populate with correct value
      };

      const userUpdateResponse = await User
      .query()
      .patchAndFetchById(existingUserRecordId, userUpdateArgHash);

      return res.status(200).json({
        data: userUpdateResponse, // TODO: Obscure user.id
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
          message: errorSid.DELETE_USER_HANDLER_UUID_INVALID,
          debugInfo,
        });
      }

      return res.status(503).send({
        message: errorSid.DELETE_USER_HANDLER_OPERATION_FAILED,
        debugInfo: err.message,
      });
    }
  }

  return deleteUserHandler;
}

module.exports = deleteUserHandlerFcomposer;
