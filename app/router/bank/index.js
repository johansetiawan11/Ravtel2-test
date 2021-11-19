const postBankReconciliationPreviewRouterComposer = require("./postBankReconciliationPreviewRouterComposer");
const postBankReconciliationRouterComposer = require("./postBankReconciliationRouterComposer");

function bankReconciliationRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;
  const expressRouter = express.Router();

  expressRouter.use(postBankReconciliationPreviewRouterComposer(diHash));
  expressRouter.use(postBankReconciliationRouterComposer(diHash));

  return expressRouter;
}

module.exports = bankReconciliationRouterFcomposer;
