const errorSid = require("../../const/errorSid");

function putUserHandlerFcomposer(diHash) {
  const {
    dbModelHash,
    objection,
  } = diHash;
  const {
    User,
  } = dbModelHash;
  const {
    DataError,
    UniqueViolationError,
  } = objection;

  async function putUserHandler(req, res) {
    try {
      const params = req.params;
      const userUuid = params.uuid;
      const body = req.body;
      const username = body.username;
      const llcUsername = username.toLocaleLowerCase();
      const userEmail = body.email;
      const llcUserEmail = userEmail.toLocaleLowerCase();

      const userUuidQueryResponse = await User
      .query()
      .where("uuid", userUuid)
      .whereNull("deleted_at");
      if (!(userUuidQueryResponse && (userUuidQueryResponse.length > 0))) {
        return res.status(404).send({
          message: errorSid.PUT_USER_HANDLER_USER_RECORD_NOT_FOUND,
        });
      }
      const existingUserRecord = userUuidQueryResponse[0];
      const existingUserRecordId = existingUserRecord.id;
      const existingUserRecordUsername = existingUserRecord.username;

      if (existingUserRecordUsername !== llcUsername) {
        /**
         * Check for unique username here instead of relying on database constraint
         * to avoid unintentionally exhausting the available user record IDs.
         */
        const usernameQueryResponse = await User
        .query()
        .where("username", llcUsername);
        if (usernameQueryResponse && (usernameQueryResponse.length > 0)) {
          return res.status(409).send({
            message: errorSid.PUT_USER_HANDLER_USERNAME_CONFLICTED,
          });
        }
      }

      const userUpdateArgHash = {
        username: llcUsername,
        password: body.password, // TODO: Encrypt password
        email: llcUserEmail, // TODO: Validate this
        acl_role: body.aclRole, // TODO: Validate this
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
          message: errorSid.PUT_USER_HANDLER_UUID_INVALID,
          debugInfo,
        });
      } else if (err instanceof UniqueViolationError) {
        if (err.constraint) {
          debugInfo = {
            constraint: err.constraint,
          };
        }

        return res.status(409).send({
          message: errorSid.PUT_USER_HANDLER_OPERATION_CONFLICTED,
          debugInfo,
        });
      }

      return res.status(503).send({
        message: errorSid.PUT_USER_HANDLER_OPERATION_FAILED,
        debugInfo: err.message,
      });
    }
  }

  return putUserHandler;
}

module.exports = putUserHandlerFcomposer;
