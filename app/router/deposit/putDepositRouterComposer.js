/**
 * @openapi
 * /deposit/{id}:
 *   put:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Update a deposit record.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the deposit to update.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/putDepositPayload'
 *     responses:
 *       200:
 *         description: Updated deposit record.
 *     tags:
 *       - deposit
 *
 * components:
 *   schemas:
 *     putDepositPayload:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: status of deposit
 *         confirmedAmount:
 *           type: string
 *           description: confirmed amount of deposit
 *       required:
 *         - status
 *         - confirmedAmount
 */
function putDepositRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.putDeposit;

  const routerPath = "/deposit/:id";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.put(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = putDepositRouterComposer;
