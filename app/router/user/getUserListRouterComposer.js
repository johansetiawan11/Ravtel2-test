/**
 * @openapi
 * /user:
 *   get:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Retrieve a list of user records.
 *     responses:
 *       200:
 *         description: Retrieved list of user records.
 *     tags:
 *       - user
 */
function getUserListRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getUserList;
  expressRouter.get("/user", [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = getUserListRouterComposer;
