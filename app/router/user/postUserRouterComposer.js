/**
 * @openapi
 * /user:
 *   post:
 *     security:
 *       - appAuthScheme: []
 *       - userAuthScheme: []
 *     description: Create a new user record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/postUserPayload'
 *     responses:
 *       200:
 *         description: Created user record.
 *     tags:
 *       - user
 *
 * components:
 *   schemas:
 *     postUserPayload:
 *       type: object
 *       properties:
 *         fullname:
 *           type: string
 *           description: Name of user
 *         email:
 *           type: string
 *           description: Email of user
 *         password:
 *           type: string
 *           description: Password of user
 *         username:
 *           type: string
 *           description: username of use
 *         rolename:
 *           type: string
 *           description: rolename of use
 *       required:
 *         - email
 *         - fullname
 *         - password
 *         - rolename
 *         - username
 */
function postUserRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.postUser;
  expressRouter.post("/user", [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = postUserRouterComposer;
