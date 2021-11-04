/**
 * @openapi
 * /nav/{id}:
 *   delete:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Delete a nav record.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the nav to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *        description: Deleted nav record.
 *     tags:
 *       - nav
 */
function deleteNavRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.deleteNav;
  expressRouter.delete("/nav/:id", [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = deleteNavRouterComposer;
