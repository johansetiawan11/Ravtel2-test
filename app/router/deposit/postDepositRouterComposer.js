/**
 * @openapi
 * /deposit:
 *   post:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Create a new deposit record.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/postDepositPayload'
 *     responses:
 *       200:
 *         description: Created deposit record.
 *     tags:
 *       - deposit
 *
 * components:
 *   schemas:
 *     postDepositPayload:
 *       type: object
 *       properties:
 *         accountId:
 *           description: Account ID of deposit
 *           type: string
 *         product:
 *           description: Product of deposit
 *           type: string
 *         depositDate:
 *           description: Date of deposit
 *           type: string
 *         currency:
 *           description: Currency of deposit
 *           type: string
 *         amount:
 *           description: Amount of deposit
 *           type: string
 *         maturity:
 *           description: Maturity of deposit
 *           type: string
 *         depositProof:
 *           description: File for deposit proof
 *           type: string
 *           format: binary
 *         status:
 *           description: Status of deposit
 *           type: string
 *         confirmedAmount:
 *           description: Confirmed amount of deposit
 *           type: string
 *       required:
 *         - accountId
 *         - product
 *         - depositDate
 *         - currency
 *         - amount
 *         - maturity
 *         - depositProof
 *         - status
 *         - confirmedAmount
 */
function postDepositRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.postDeposit;

  const routerPath = "/deposit";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.post(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = postDepositRouterComposer;
