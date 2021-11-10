/**
 * @openapi
 * /investment/{id}:
 *   put:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Update an investment record.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the investment to update.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/putInvestmentPayload'
 *     responses:
 *       200:
 *         description: Updated investment record.
 *     tags:
 *       - investment
 *
 * components:
 *   schemas:
 *     putInvestmentPayload:
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
function putInvestmentRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.putInvestment;

  const routerPath = "/investment/:id";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.put(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = putInvestmentRouterComposer;
