const accountRouterFcomposer = require("./account");
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
  const subscriptionRouter = subscriptionRouterFcomposer(diHash);
  const userRouter = userRouterFcomposer(diHash);

  expressRouter.use(accountRouter);
  expressRouter.use(subscriptionRouter);
  expressRouter.use(userRouter);

  return expressRouter;
}

module.exports = routerFcomposer;
