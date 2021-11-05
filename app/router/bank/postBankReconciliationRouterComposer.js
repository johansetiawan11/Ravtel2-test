/**
 * @openapi
 * /bank/reconciliation:
 *   post:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Create a new bank reconciliation record.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/postBankReconciliationPayload'
 *     responses:
 *       200:
 *         description: Created bank reconciliation record.
 *     tags:
 *       - bank
 *
 * components:
 *   schemas:
 *     postBankReconciliationPayload:
 *       type: object
 *       properties:
 *         account_id:
 *           description: Account ID
 *           type: string
 *         transaction_date:
 *           description: Transaction date
 *           type: string
 *         file:
 *           description: File path
 *           type: string
 *           format: binary
 *       required:
 *         - account_id
 *         - transaction_date
 *         - file
 */
function postBankReconciliationRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.postBankReconciliation;

  const routerPath = "/bank/reconciliation";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.post(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;

}

module.exports = postBankReconciliationRouterComposer;
