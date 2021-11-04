/**
 * @openapi
 * /account/{id}:
 *   delete:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Delete an account record.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the account to delete
 *         required: true
 *         schema:
 *            type: integer
 *     responses:
 *       200:
 *        description: Deleted account record.
 *     tags:
 *       - account
 */
function deleteAccountRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.deleteAccount;

  const routerPath = "/account/:id";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.delete(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));
  return expressRouter;
}

module.exports = deleteAccountRouterComposer;
