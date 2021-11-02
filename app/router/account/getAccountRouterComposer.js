/**
 * @openapi
 * /account/{id}:
 *   get:
 *     security:
 *       - appAuthScheme: []
 *       - userAuthScheme: []
 *     description: Retrieve an account record.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the account to retrieve.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retrieved account record.
 *     tags:
 *       - account
 */
function getAccountRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getAccount;
  expressRouter.get("/account/:id", [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = getAccountRouterComposer;
