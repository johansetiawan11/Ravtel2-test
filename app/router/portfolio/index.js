const getPortfolioListRouterComposer = require("./getPortfolioListRouterComposer");
const getPortfolioRouterComposer = require("./getPortfolioRouterComposer");

function portfolioRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;
  const expressRouter = express.Router();

  expressRouter.use(getPortfolioListRouterComposer(diHash));
  expressRouter.use(getPortfolioRouterComposer(diHash));

  return expressRouter;
}

module.exports = portfolioRouterFcomposer;
