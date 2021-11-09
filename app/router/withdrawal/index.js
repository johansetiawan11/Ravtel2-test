const getWithdrawalListRouterComposer = require("./getWithdrawalListRouterComposer");
const postWithdrawalRouterComposer = require("./postWithdrawalRouterComposer");

function withdrawalRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;
  const expressRouter = express.Router();

  expressRouter.use(getWithdrawalListRouterComposer(diHash));
  expressRouter.use(postWithdrawalRouterComposer(diHash));

  return expressRouter;
}

module.exports = withdrawalRouterFcomposer;
