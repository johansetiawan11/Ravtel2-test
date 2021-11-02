/* eslint-disable consistent-return */
const httpStatusMessage = require("../../const/httpStatusMessage");

function appAuthHandlerFcomposer(diHash) {
  function appAuthHandler(req, res, next) {
    const {
      env,
    } = diHash;

    const xAppKey = req.headers["x-api-key"];
    if (!xAppKey) {
      return res.status(401).send({
        message: httpStatusMessage.EMPTY_X_API_KEY,
      });
    }

    if (
      !(
        (typeof env.GENERIC_JOB_API_KEY !== "undefined")
        && (env.GENERIC_JOB_API_KEY !== "")
        && (`${env.GENERIC_JOB_API_KEY}` === `${xAppKey}`)
      )
    ) {
      return res.status(401).send({
        message: httpStatusMessage.INVALID_X_API_KEY,
      });
    }

    next();
  }

  return appAuthHandler;
}

module.exports = appAuthHandlerFcomposer;
