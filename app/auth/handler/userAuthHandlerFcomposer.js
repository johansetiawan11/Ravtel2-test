/* eslint-disable consistent-return */
const httpStatusMessage = require("../../const/httpStatusMessage");

function userAuthHandlerFcomposer(diHash) {
  function userAuthHandler(req, res, next) {
    const {
      jwt,
    } = diHash;

    const authorizationHeader = req.headers.authorization || req.headers.Authorization;
    if (!authorizationHeader) {
      return res.status(401).send({
        message: httpStatusMessage.EMPTY_AUTHORIZATION_HEADER,
      });
    }

    const authorizationTokenPattern = new RegExp(/^Bearer (.*)$/, "i");
    const authorizationTokenMatch = authorizationHeader.match(authorizationTokenPattern);
    const authorizationToken = (
      authorizationTokenMatch
      && authorizationTokenMatch[1]
    )
      ? authorizationTokenMatch[1]
      : "";
    if (authorizationToken === "") {
      return res.status(401).send({
        message: httpStatusMessage.MALFORMED_AUTHORIZATION_TOKEN,
      });
    }

    // TODO: Make 'secret' more secure
    jwt.verify(authorizationToken, "secret", (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: httpStatusMessage.INVALID_AUTHORIZATION_TOKEN,
        });
      }
      req.role = decoded.role;
      req.userId = decoded.id;

      next();
    });
  }

  return userAuthHandler;
}

module.exports = userAuthHandlerFcomposer;
