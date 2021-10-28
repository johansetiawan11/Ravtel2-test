/**
 * @openapi
 * /user/{UUID}:
 *   put:
 *     description: Update a user record.
 *     parameters:
 *       - in: path
 *         name: UUID
 *         required: true
 *         description: String UUID of the user to update.
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
 *           type: string
 *           description: Name of userr
 *         email:
 *           type: string
 *           description: Email of userr
 *         username:
 *           type: string
 *           description: username of use
 *         rolename:
 *           type: string
 *           description: rolename of use
 *       required:
 *         - email
 *         - fullname
 *         - rolename
 *         - username
 */
function putUserRouterComposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
    middlewareFcomposerHash,
  } = diHash;
  const auth = middlewareFcomposerHash.Authentication;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.putUser;
  expressRouter.put("/user/:uuid", [auth(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = putUserRouterComposer;
