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
 *         fullname:
 *           description: Full name of user
 *           type: string
 *         email:
 *           description: Email of user
 *           type: string
 *         username:
 *           description: username of user
 *           type: string
 *         rolename:
 *           description: rolename of user
 *           type: string
 *       required:
 *         - email
 *         - fullname
 *         - rolename
 *         - username
 */
function putUserRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.putUser;
  expressRouter.put("/user/:uuid", [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = putUserRouterComposer;
