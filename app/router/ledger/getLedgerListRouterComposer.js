/**
 * @openapi
 * /ledger:
 *   get:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Retrieve a list of ledger records.
 *     parameters:
 *       - in: query
 *         name: s-account-id
 *         description: search by account id.
 *         schema:
 *           type: string
 *           nullable: true
 *       - in: query
 *         name: s-start-date
 *         description: search by start date.
 *         schema:
 *           type: string
 *           nullable: true
 *         allowReserved: true
 *       - in: query
 *         name: s-end-date
 *         description: search by end date.
 *         schema:
 *           type: string
 *           nullable: true
 *         allowReserved: true
 *       - in: query
 *         name: s
 *         description: search by query.
 *         schema:
 *           type: string
 *           nullable: true
 *         allowReserved: true
 *     responses:
 *       200:
 *         description: Retrieved list of ledger records.
 *     tags:
 *       - ledger
 */
function getLedgerListRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getLedgerList;

  const routerPath = "/ledger";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.get(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = getLedgerListRouterComposer;
