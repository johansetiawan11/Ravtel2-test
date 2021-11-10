/**
 * @openapi
 * /investment/{id}:
 *   delete:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Delete an investment record.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the investment to delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted investment record.
 *     tags:
 *       - investment
 */
function deleteInvestmentRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.deleteInvestment;

  const routerPath = "/investment/:id";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.delete(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = deleteInvestmentRouterComposer;
