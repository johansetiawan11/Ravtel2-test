/**
 * @openapi
 * /bank/reconciliation/preview:
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
 *             $ref: '#/components/schemas/postBankReconciliationPreviewPayload'
 *     responses:
 *       200:
 *         description: Created bank reconciliation record.
 *     tags:
 *       - bank
 *
 * components:
 *   schemas:
 *     postBankReconciliationPreviewPayload:
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
function postBankReconciliationPreviewRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.postBankReconciliationPreview;

  const routerPath = "/bank/reconciliation/preview";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.post(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;

}

module.exports = postBankReconciliationPreviewRouterComposer;
