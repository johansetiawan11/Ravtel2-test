const deleteAccountRouterComposer = require("./deleteAccountRouterComposer");
const getAccountListRouterComposer = require("./getAccountListRouterComposer");
const getAccountRouterComposer = require("./getAccountRouterComposer");
const postUserAuthRouterComposer = require("./postAccountRouterComposer");

function accountRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;
  const expressRouter = express.Router();

  expressRouter.use(deleteAccountRouterComposer(diHash));
  expressRouter.use(getAccountListRouterComposer(diHash));
  expressRouter.use(getAccountRouterComposer(diHash));
  expressRouter.use(postUserAuthRouterComposer(diHash));

  return expressRouter;
}

module.exports = accountRouterFcomposer;
