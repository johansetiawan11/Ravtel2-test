/**
 * @openapi
 * /product/{id}:
 *   delete:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Delete a product record.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted product record.
 *     tags:
 *       - product
 */
function deleteProductRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.deleteProduct;

  const routerPath = "/product/:id";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.delete(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = deleteProductRouterComposer;
