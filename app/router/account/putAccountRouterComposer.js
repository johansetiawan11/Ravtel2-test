/**
 * @openapi
 * /account/{id}:
 *   put:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Update an account record.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the account to update.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/putAccountPayload'
 *     responses:
 *       200:
 *         description: Updated account record.
 *     tags:
 *       - account
 *
 * components:
 *   schemas:
 *     putAccountPayload:
 *       type: object
 *       properties:
 *         entity:
 *           description: Entity of account for Personal
 *           type: string
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
 *         idcard:
 *           description: File path for idcard
 *           type: string
 *           format: binary
 *         taxcard:
 *           description: File path for tax card
 *           type: string
 *           format: binary
 *         selfie:
 *           description: File path for selfie
 *           type: string
 *           format: binary
 */
function putAccountRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.putAccount;

  const routerPath = "/account/:id";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.put(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = putAccountRouterComposer;
