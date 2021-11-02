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
 *         credit:
 *           type: number
 *           description: credit
 *         debit:
 *           type: number
 *           description: debit
 *         event_code:
 *           type: string
 *           description: event_code
 *       required:
 *         - event_code
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
