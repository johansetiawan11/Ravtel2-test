/**
 * @openapi
 * /account:
 *   get:
 *     description: Retrieve a list of account records.
 *     responses:
 *       200:
 *         description: Retrieved list of account records.
 *     tags:
 *       - account
 */
function getAccountListRouterComposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
    middlewareFcomposerHash,
  } = diHash;
  const auth = middlewareFcomposerHash.Authentication;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getAccountList;
  expressRouter.get("/account", [auth(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = getAccountListRouterComposer;
