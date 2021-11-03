/**
 * @openapi
 * /account:
 *   get:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Retrieve a list of account records.
 *     responses:
 *       200:
 *         description: Retrieved list of account records.
 *     tags:
 *       - account
 */
function getAccountListRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getAccountList;
  expressRouter.get("/account", [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = getAccountListRouterComposer;
