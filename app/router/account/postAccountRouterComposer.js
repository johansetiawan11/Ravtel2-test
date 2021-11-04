/**
 * @openapi
 * /account:
 *   post:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Create a new account record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/postAccountPayload'
 *     responses:
 *       200:
 *         description: Created account record.
 *     tags:
 *       - account
 *
 * components:
 *   schemas:
 *     postAccountPayload:
 *       type: object
 *       properties:
 *         name:
 *           description: Name of account for Personal
 *           type: string
 *         gender:
 *           description: Gender of account for Personal
 *           type: string
 *         birthday:
 *           description: Birthday of account for Personal
 *           type: string
 *         identityNum:
 *           description: Identity num of account for Personal
 *           type: string
 *         companyName:
 *           description: Company name of account for Company
 *           type: string
 *         industry:
 *           description: Industry of account for Company
 *           type: string
 *         doe:
 *           description: Date Of Establish of account for Company
 *           type: string
 *         regisNum:
 *           description: Registration Number of account for Company
 *           type: string
 *         email:
 *           description: Email of account
 *           type: string
 *         taxnum:
 *           description: Tax number of account
 *           type: string
 *         phone:
 *           description: Phone of account
 *           type: string
 *         handphone:
 *           description: Handphone of account
 *           type: string
 *         address:
 *           description: Address of account
 *           type: string
 *         city:
 *           description: City of account
 *           type: string
 *         district:
 *           description: Province/district of account
 *           type: string
 *         country:
 *           description: Country of account
 *           type: string
 *         zipcode:
 *           description: Zipcode of account
 *           type: string
 *         status:
 *           description: Status of account
 *           type: string
 *         accountName:
 *           description: Account name of Bank for account
 *           type: string
 *         accountNumber:
 *           description: Account number of Bank for account
 *           type: string
 *         branch:
 *           description: Branch of Bank for account
 *           type: string
 *         swiftCode:
 *           description: Swift code of Bank for account
 *           type: string
 *         currency:
 *           description: Currency of Bank for account
 *           type: string
 */
function postAccountRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.postAccount;

  const routerPath = "/account";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.post(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = postAccountRouterComposer;
