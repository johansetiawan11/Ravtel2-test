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
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.deleteNav;

  const routerPath = "/nav/:id";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.delete(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = deleteNavRouterComposer;
