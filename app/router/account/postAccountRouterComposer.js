/**
 * @openapi
 * /account:
 *   post:
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
 *           type: string
 *           description: Name of account for Personal
 *         gender:
 *           type: string
 *           description: gender of account for Personal
 *         birthday:
 *           type: string
 *           description: birthday of account for Personal
 *         identityNum:
 *           type: string
 *           description: identityNum of account for Personal
 *         companyName:
 *           type: string
 *           description: companyName of account for Company
 *         industry:
 *           type: string
 *           description: industry of account for Company
 *         doe:
 *           type: string
 *           description: Date Of Establish of account for Company
 *         regisNum:
 *           type: string
 *           description: registration Number of account for Company
 *         email:
 *           type: string
 *           description: Email of account
 *         taxnum:
 *           type: string
 *           description: taxNumber of account
 *         phone:
 *           type: string
 *           description: phone of account
 *         handphone:
 *           type: string
 *           description: handphone of account
 *         address:
 *           type: string
 *           description: address of account
 *         city:
 *           type: string
 *           description: city of account
 *         district:
 *           type: string
 *           description: province / district of account
 *         country:
 *           type: string
 *           description: country of account
 *         zipcode:
 *           type: string
 *           description: zipcode of account
 *         status:
 *           type: string
 *           description: status of account
 *         accountName:
 *           type: string
 *           description: account name of Bank for account
 *         accountNumber:
 *           type: string
 *           description: account number of Bank for account
 *         branch:
 *           type: string
 *           description: branch of Bank for account
 *         swiftCode:
 *           type: string
 *           description: swiftCode of Bank for account
 *         currency:
 *           type: string
 *           description: currency of Bank for account
 */
function postAccountRouterComposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
  } = diHash;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.postAccount;
  expressRouter.post("/account", handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = postAccountRouterComposer;
