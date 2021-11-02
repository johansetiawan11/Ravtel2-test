const deleteAccountRouterComposer = require("./deleteAccountRouterComposer");
const getAccountListRouterComposer = require("./getAccountListRouterComposer");
const getUserRouterComposer = require("./getAccountRouterComposer");
const postUserAuthRouterComposer = require("./postAccountRouterComposer");

function accountRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;
  const expressRouter = express.Router();

  expressRouter.use(deleteAccountRouterComposer(diHash));
  expressRouter.use(getAccountListRouterComposer(diHash));
  expressRouter.use(getUserRouterComposer(diHash));
  expressRouter.use(postUserAuthRouterComposer(diHash));

  return expressRouter;
}

module.exports = accountRouterFcomposer;
