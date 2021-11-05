/**
 * @openapi
 * /deposit/{id}:
 *   get:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Retrieve a deposit record.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the deposit to retrieve.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retrieved deposit record.
 *     tags:
 *       - deposit
 */
function getDepositRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getDeposit;

  const routerPath = "/deposit/:id";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.get(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = getDepositRouterComposer;
