/**
 * @openapi
 * /user/{UUID}:
 *   put:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Update a user record.
 *     parameters:
 *       - in: path
 *         name: UUID
 *         description: UUID of the user to update.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/putUserPayload'
 *     responses:
 *       200:
 *         description: Updated user record.
 *     tags:
 *       - user
 *
 * components:
 *   schemas:
 *     putUserPayload:
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
function putUserRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
    middlewareHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.putUser;

  const routerPath = "/user/:uuid";
  expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.put(routerPath, [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = putUserRouterComposer;
