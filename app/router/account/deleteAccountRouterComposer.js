/**
 * @openapi
 * /account/{id}:
 *   delete:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the account to delete
 *         schema:
 *            type: integer
 *     responses:
 *       200:
 *        description: Delete account record.
 *     tags:
 *       - account
 */
function deleteAccountRouterComposer(diHash) {
  const { express, handlerFcomposerHash, middlewareFcomposerHash } = diHash;
  const auth = middlewareFcomposerHash.Authentication;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.deleteAccount;
  expressRouter.delete("/account/:id", [auth(diHash)], handlerFcomposer(diHash));
  return expressRouter;
}

module.exports = deleteAccountRouterComposer;
