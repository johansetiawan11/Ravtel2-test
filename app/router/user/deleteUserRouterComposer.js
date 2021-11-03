/**
 * @openapi
 * /user/{UUID}:
 *   delete:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Delete a user record.
 *     parameters:
 *       - in: path
 *         name: UUID
 *         description: UUID of the user to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *        description: Deleted user record.
 *     tags:
 *       - user
 */
function deleteUserRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.deleteUser;
  expressRouter.delete("/user/:uuid", [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = deleteUserRouterComposer;
