const accountRouterFcomposer = require("./account");
const bankRouterFcomposer = require("./bank");
const depositRouterFcomposer = require("./deposit");
const investmentRouterFcomposer = require("./investment");
const ledgerRouterFcomposer = require("./ledger");
const navRouterFcomposer = require("./nav");
const portfolioRouterFcomposer = require("./portfolio");
const productRouterFcomposer = require("./product");
const subscriptionRouterFcomposer = require("./subscription");
const userRouterFcomposer = require("./user");
const withdrawalRouterFcomposer = require("./withdrawal");

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     appAuthScheme:
 *       type: apiKey
 *       in: header
 *       name: x-api-key
 *     userAuthScheme:
 *       type: http
 *       scheme: bearer
 */
function routerFcomposer(diHash) {
  const {
    express,
  } = diHash;
  const expressRouter = express.Router();

  const accountRouter = accountRouterFcomposer(diHash);
  expressRouter.use(accountRouter);

  const bankRouter = bankRouterFcomposer(diHash);
  expressRouter.use(bankRouter);

  const depositRouter = depositRouterFcomposer(diHash);
  expressRouter.use(depositRouter);

  const investmentRouter = investmentRouterFcomposer(diHash);
  expressRouter.use(investmentRouter);

  const ledgerRouter = ledgerRouterFcomposer(diHash);
  expressRouter.use(ledgerRouter);

  const navRouter = navRouterFcomposer(diHash);
  expressRouter.use(navRouter);

  const productRouter = productRouterFcomposer(diHash);
  expressRouter.use(productRouter);

  const portfolioRouter = portfolioRouterFcomposer(diHash);
  expressRouter.use(portfolioRouter);

  const subscriptionRouter = subscriptionRouterFcomposer(diHash);
  expressRouter.use(subscriptionRouter);

  const userRouter = userRouterFcomposer(diHash);
  expressRouter.use(userRouter);

  const withdrawalRouter = withdrawalRouterFcomposer(diHash);
  expressRouter.use(withdrawalRouter);

  return expressRouter;
}

module.exports = routerFcomposer;
