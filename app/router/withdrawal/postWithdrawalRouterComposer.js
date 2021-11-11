/**
 * @openapi
 * /withdrawal:
 *   post:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Create a new withdrawal record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/postWithdrawalPayload'
 *     responses:
 *       200:
 *         description: Created withdrawal record.
 *     tags:
 *       - withdrawal
 *
 * components:
 *   schemas:
 *     postWithdrawalPayload:
 *       type: object
 *       properties:
 *         accountId:
 *           description: ID of account.
 *           type: string
 *         amount:
 *           description: Amount of withdrawal.
 *           type: string
 *         product:
 *           description: Product of subscription.
 *           type: string
 *       required:
 *         - accountId
 *         - amount
 *         - product
 */
function postWithdrawalRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.postWithdrawal;

  const routerPath = "/withdrawal";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.post(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = postWithdrawalRouterComposer;
