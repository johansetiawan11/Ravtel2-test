/**
 * @openapi
 * /product/{id}:
 *   put:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Update a product record.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to update.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/putProductPayload'
 *     responses:
 *       200:
 *         description: Updated product record.
 *     tags:
 *       - product
 *
 * components:
 *   schemas:
 *     putProductPayload:
 *       type: object
 *       properties:
 *         productName:
 *           description: Name of product.
 *           type: string
 *         productDescription:
 *           description: Description of product.
 *           type: string
 *         performanceFee:
 *           description: Performance fee of product.
 *           type: string
 *         penaltyFee:
 *           description: Penalty fee of product.
 *           type: string
 *       required:
 *         - productName
 *         - productDescription
 *         - performanceFee
 *         - penaltyFee
 */
function putProductRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.putProduct;

  const routerPath = "/product/:id";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.put(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = putProductRouterComposer;
