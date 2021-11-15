/**
 * @openapi
 * /portfolio/{id}:
 *   get:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: generate a portfolio record.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the Account to retrieve for generate portfolio.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retrieved portfolio record.
 *     tags:
 *       - portfolio
 */
function getPortfolioRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getPortfolio;

  const routerPath = "/portfolio/:id";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.get(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}
module.exports = getPortfolioRouterComposer;
