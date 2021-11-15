/**
 * @openapi
 * /ledger:
 *   post:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Create a new ledger record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/postLedgerPayload'
 *     responses:
 *       200:
 *         description: Created ledger record.
 *     tags:
 *       - ledger
 *
 * components:
 *   schemas:
 *     postLedgerPayload:
 *       type: object
 *       properties:
 *         accountId:
 *           type: number
 *           description: ID Account of Ledger
 *         credit:
 *           type: number
 *           description: Credit Value of Ledger
 *         debit:
 *           type: number
 *           description: Debit Value of Ledger
 *         eventCode:
 *           type: string
 *           description: Event Code of Ledger
 *         info:
 *           type: string
 *           description: Info of Ledger
 *       required:
 *         - accountId
 *         - eventCode
 */
function postLedgerRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.postLedger;

  const routerPath = "/ledger";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.post(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = postLedgerRouterComposer;
