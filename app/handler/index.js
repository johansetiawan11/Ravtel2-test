const deleteUser = require("./user/deleteUserHandlerFcomposer");
const getUser = require("./user/getUserHandlerFcomposer");
const getUserList = require("./user/getUserListHandlerFcomposer");
const postUser = require("./user/postUserHandlerFcomposer");
const postUserAuth = require("./user/postUserAuthHandlerFcomposer");
const putUser = require("./user/putUserHandlerFcomposer");

const handlerFcomposerHash = {
  deleteUser,
  getUser,
  getUserList,
  postUser,
  postUserAuth,
  putUser,
};

module.exports = handlerFcomposerHash;
