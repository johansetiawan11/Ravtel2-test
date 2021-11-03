/**
 * @openapi
 * /subscription:
 *   get:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Retrieve a list of subscription records.
 *     responses:
 *       200:
 *         description: Retrieved list of subscription records.
 *     tags:
 *       - subscription
 */
function getSubscriptionListRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getSubscriptionList;
  expressRouter.get("/subscription", [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = getSubscriptionListRouterComposer;
