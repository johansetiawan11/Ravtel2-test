const deleteDepositRouterComposer = require("./deleteDepositRouterComposer");
const getDepositListRouterComposer = require("./getDepositListRouterComposer");
const getDepositRouterComposer = require("./getDepositRouterComposer");
const postDepositAttachment = require("./postDepositRouterComposer");
const putDepositRouterComposer = require("./putDepositRouterComposer");

function depositRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;
  const expressRouter = express.Router();

  expressRouter.use(deleteDepositRouterComposer(diHash));
  expressRouter.use(postDepositAttachment(diHash)); // Positioned before getDepositRouterComposer to avoid openapi validation conflict
  expressRouter.use(getDepositListRouterComposer(diHash));
  expressRouter.use(getDepositRouterComposer(diHash));
  expressRouter.use(putDepositRouterComposer(diHash));

  return expressRouter;
}

module.exports = depositRouterFcomposer;
