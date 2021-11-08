const accountRouterFcomposer = require("./account");
const depositRouterFcomposer = require("./deposit");
const ledgerRouterFcomposer = require("./ledger");
const navRouterFcomposer = require("./nav");
const subscriptionRouterFcomposer = require("./subscription");
const userRouterFcomposer = require("./user");

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

  const depositRouter = depositRouterFcomposer(diHash);
  expressRouter.use(depositRouter);

  const ledgerRouter = ledgerRouterFcomposer(diHash);
  expressRouter.use(ledgerRouter);

  const navRouter = navRouterFcomposer(diHash);
  expressRouter.use(navRouter);

  const subscriptionRouter = subscriptionRouterFcomposer(diHash);
  expressRouter.use(subscriptionRouter);

  const userRouter = userRouterFcomposer(diHash);
  expressRouter.use(userRouter);

  return expressRouter;
}

module.exports = routerFcomposer;
