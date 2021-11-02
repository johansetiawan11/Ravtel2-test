const getLedgerListRouterComposer = require("./getLedgerListRouterComposer");
const postLedgerRouteComposer = require("./postLedgerRouteComposer");
const getLedgerRouterComposer = require("./getLedgerRouterComposer");

function userRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;
  const expressRouter = express.Router();

  expressRouter.use(postLedgerRouteComposer(diHash));
  expressRouter.use(getLedgerListRouterComposer(diHash));
  expressRouter.use(getLedgerRouterComposer(diHash));

  return expressRouter;
}

module.exports = userRouterFcomposer;
