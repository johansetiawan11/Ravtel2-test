/**
 * @openapi
 * /user:
 *   post:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
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
 *         username:
 *           description: Username of user.
 *           type: string
 *         email:
 *           description: Email of user.
 *           type: string
 *         password:
 *           description: Password of user.
 *           type: string
 *         aclRole:
 *           description: ACL role of user.
 *           type: string
 *       required:
 *         - username
 *         - email
 *         - password
 *         - aclRole
 */
function postUserRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.postUser;

  const routerPath = "/user";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.post(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = postUserRouterComposer;
