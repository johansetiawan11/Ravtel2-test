/* eslint-disable consistent-return */
const appAuthHandlerFcomposer = require("./appAuthHandlerFcomposer");
const httpStatusMessage = require("../../const/httpStatusMessage");
const userAuthHandlerFcomposer = require("./userAuthHandlerFcomposer");

function appOrUserAuthHandlerFcomposer(diHash) {
  const appAuthHandler = appAuthHandlerFcomposer(diHash);
  const userAuthHandler = userAuthHandlerFcomposer(diHash);

  function appOrUserAuthHandler(req, res, next) {
    const debugInfo = {};
    const resEmulator = {
      send: function (payload) {
        this.payload = payload;

        return this;
      },

      status: function (httpStatusCode) {
        this.httpStatusCode = httpStatusCode;

        return this;
      },
    };

    let nextEmulatorCalled = false;
    function nextEmulator() {
      nextEmulatorCalled = true;
    }

    appAuthHandler(req, resEmulator, nextEmulator);

    if (!nextEmulatorCalled) {
      debugInfo.appAuthHandlerResponse = `${resEmulator.httpStatusCode}: ${resEmulator.payload.message}`;

      userAuthHandler(req, resEmulator, nextEmulator);

      if (!nextEmulatorCalled) {
        debugInfo.userAuthHandlerResponse = `${resEmulator.httpStatusCode}: ${resEmulator.payload.message}`;

        return res.status(401).send({
          message: httpStatusMessage.INVALID_APP_OR_USER_AUTHORIZATION,
          debugInfo,
        });
      }
    }

    next();
  }

  return appOrUserAuthHandler;
}

module.exports = appOrUserAuthHandlerFcomposer;
