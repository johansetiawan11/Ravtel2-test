/**
 * TODO:
 * - Rename this file (new name TBA)
 * - Refactor this so each route is accessible by providing 'app token' or 'user token'
 */
const Authentication = require("./MiddlewareAuth");

const middlewareFcomposerHash = {
  Authentication,
};

module.exports = middlewareFcomposerHash;
