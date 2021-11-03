/**
 * @openapi
 * /subscription/{id}:
 *   get:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Retrieve a subscription record.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the subscription to retrieve.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retrieved subscription record.
 *     tags:
 *       - subscription
 */
function getUserListRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getSubscription;
  expressRouter.get("/subscription/:id", [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}
module.exports = getUserListRouterComposer;
