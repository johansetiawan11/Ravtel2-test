/**
 * @openapi
 * /product:
 *   post:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Create a new product record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/postProductPayload'
 *     responses:
 *       200:
 *         description: Created product record.
 *     tags:
 *       - product
 *
 * components:
 *   schemas:
 *     postProductPayload:
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
function postProductRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.postProduct;

  const routerPath = "/product";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.post(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = postProductRouterComposer;
