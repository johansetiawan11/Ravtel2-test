const postUser = require("./user/postUserHandlerFcomposer");
const postUserAuth = require("./user/postUserAuthHandlerFcomposer");

const handlerFcomposerHash = {
  postUser,
  postUserAuth,
};

module.exports = handlerFcomposerHash;
