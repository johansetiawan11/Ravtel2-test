/**
 * @openapi
 * /account/{id}:
 *   get:
 *     description: Retrieve a account record.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the account to retrieve.
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
    express,
    handlerFcomposerHash,
    middlewareFcomposerHash,
  } = diHash;
  const auth = middlewareFcomposerHash.Authentication;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getAccount;
  expressRouter.get("/account/:id", [auth(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = getAccountRouterComposer;
