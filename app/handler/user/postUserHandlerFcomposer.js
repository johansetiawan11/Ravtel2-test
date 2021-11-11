const errorSid = require("../../const/errorSid");

function postUserHandlerFcomposer(diHash) {
  const {
    dbModelHash,
    objection,
  } = diHash;
  const {
    User,
  } = dbModelHash;
  const {
    UniqueViolationError,
  } = objection;

  async function postUserHandler(req, res) {
    try {
      const body = req.body;
      const username = body.username;
      const llcUsername = username.toLocaleLowerCase();
      const userEmail = body.email;
      const llcUserEmail = userEmail.toLocaleLowerCase();

      /**
       * Check for unique username here instead of relying on database constraint
       * to avoid unintentionally exhausting the available user record IDs.
       */
      const userQueryResponse = await User
      .query()
      .where("username", llcUsername);
      if (userQueryResponse && (userQueryResponse.length > 0)) {
        return res.status(409).send({
          message: errorSid.POST_USER_HANDLER_USERNAME_CONFLICTED,
        });
      }

      const userInsertArgHash = {
        username: llcUsername,
        password: body.password, // TODO: Encrypt password
        email: llcUserEmail, // TODO: Validate this
        acl_role: body.aclRole, // TODO: Validate this
      };
      const userInsertResponse = await User
      .query()
      .insert(userInsertArgHash);

      // Refetch the record to populate uuid, etc
      const userRefetchResponse = await userInsertResponse.$query();

      return res.status(200).json({
        data: userRefetchResponse, // TODO: Obscure user.id
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
          message: errorSid.POST_USER_HANDLER_OPERATION_CONFLICTED,
          debugInfo,
        });
      }

      return res.status(503).send({
        message: errorSid.POST_USER_HANDLER_OPERATION_FAILED,
        debugInfo: err.message,
      });
    }
  }

  return postUserHandler;
}

module.exports = postUserHandlerFcomposer;
