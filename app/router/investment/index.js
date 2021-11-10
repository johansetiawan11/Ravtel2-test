const deleteInvestmentRouterComposer = require("./deleteInvestmentRouterComposer");
const getInvestmentListRouterComposer = require("./getInvestmentListRouterComposer");
const getInvestmentRouterComposer = require("./getInvestmentRouterComposer");
const postInvestmentRouterComposer = require("./postInvestmentRouterComposer");
const putInvestmentRouterComposer = require("./putInvestmentRouterComposer");

function navRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;
  const expressRouter = express.Router();

  expressRouter.use(deleteInvestmentRouterComposer(diHash));
  expressRouter.use(getInvestmentListRouterComposer(diHash));
  expressRouter.use(getInvestmentRouterComposer(diHash));
  expressRouter.use(postInvestmentRouterComposer(diHash));
  expressRouter.use(putInvestmentRouterComposer(diHash));

  return expressRouter;
}

module.exports = navRouterFcomposer;
