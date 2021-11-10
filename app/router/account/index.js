const deleteAccountRouterComposer = require("./deleteAccountRouterComposer");
const getAccountListRouterComposer = require("./getAccountListRouterComposer");
const getAccountRouterComposer = require("./getAccountRouterComposer");
const postAccountRouterComposer = require("./postAccountRouterComposer");
const putAccountRouterComposer = require("./putAccountRouterComposer");

function accountRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;
  const expressRouter = express.Router();

  expressRouter.use(putAccountRouterComposer(diHash));
  expressRouter.use(deleteAccountRouterComposer(diHash));
  expressRouter.use(postAccountRouterComposer(diHash));
  expressRouter.use(getAccountListRouterComposer(diHash));
  expressRouter.use(getAccountRouterComposer(diHash));

  return expressRouter;
}

module.exports = accountRouterFcomposer;
