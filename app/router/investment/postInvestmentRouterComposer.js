/**
 * @openapi
 * /investment:
 *   post:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Create a new investment record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/postInvestmentPayload'
 *     responses:
 *       200:
 *         description: Created investment record.
 *     tags:
 *       - investment
 *
 * components:
 *   schemas:
 *     postInvestmentPayload:
 *       type: object
 *       properties:
 *         accountId:
 *           description: Client of investment.
 *           type: string
 *         productId:
 *           description: Product of investment.
 *           type: string
 *         lastUnitAmount:
 *           description: Last Unit Amount of investment.
 *           type: string
 *         hwm:
 *           description: HWM of investment.
 *           type: string
 *         performanceFeePercent:
 *           description: Performance Fee Percent of investment.
 *           type: string
 *         penaltyFeePercent:
 *           description: Penalty Fee Percent of investment.
 *           type: string
 *         invesmentDate:
 *           description: Invesment date.
 *           type: string
 *         nextPerformanceFeeDate:
 *           description: Next Performance Fee Date of investment.
 *           type: string
 *         maturityDate:
 *           description: Maturity Date of investment.
 *           type: string
 *       required:
 *         - accountId
 *         - productId
 *         - hwm
 *         - lastUnitAmount
 *         - performanceFeePercent
 *         - penaltyFeePercent
 *         - invesmentDate
 *         - nextPerformanceFeeDate
 *         - maturityDate
 */
function postInvestmentRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.postInvestment;

  const routerPath = "/investment";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.post(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = postInvestmentRouterComposer;
