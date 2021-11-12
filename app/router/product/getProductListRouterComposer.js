/**
 * @openapi
 * /product:
 *   get:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Retrieve a list of product records.
 *     parameters:
 *       - in: query
 *         name: s-product-name
 *         description: Product name search keyword.
 *         schema:
 *           type: string
 *           nullable: true
 *       - in: query
 *         name: page
 *         description: Listing page number.
 *         schema:
 *           type: integer
 *           nullable: true
 *       - in: query
 *         name: length
 *         description: Listing length.
 *         schema:
 *           type: integer
 *           nullable: true
 *       - in: query
 *         name: direction
 *         description: Listing sort direction.
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *           nullable: true
 *     responses:
 *       200:
 *         description: Retrieved list of product records.
 *     tags:
 *       - product
 */
function getProductListRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getProductList;

  const routerPath = "/product";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.get(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = getProductListRouterComposer;
