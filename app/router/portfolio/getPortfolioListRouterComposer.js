/**
 * @openapi
 * /portfolio:
 *   get:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Retrieve a list of portfolio records.
 *     responses:
 *       200:
 *         description: Retrieved list of portfolio records.
 *     tags:
 *       - portfolio
 */
function getPortfolioListRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getPortfolioList;

  const routerPath = "/portfolio";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.get(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = getPortfolioListRouterComposer;
