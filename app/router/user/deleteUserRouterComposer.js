/**
 * @openapi
 * /user/{UUID}:
 *   delete:
 *     parameters:
 *       - in: path
 *         name: UUID
 *         schema:
 *            type: string
 *         required: true
 *         description: String UUID of the user to delete
 *     responses:
 *       200:
 *        description: Delete user record.
 *     tags:
 *       - user
 */
function deleteUserRouterComposer(diHash) {
  const { express, handlerFcomposerHash, middlewareFcomposerHash } = diHash;
  const auth = middlewareFcomposerHash.Authentication;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.deleteUser;
  expressRouter.delete("/user/:uuid", [auth(diHash)], handlerFcomposer(diHash));
  return expressRouter;
}

module.exports = deleteUserRouterComposer;
