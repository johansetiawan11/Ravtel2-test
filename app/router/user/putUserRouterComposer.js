/**
 * @openapi
 * /user/{id}:
 *   put:
 *     description: Update a user record.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
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
 *         email:
 *           type: string
 *           description: Email of user
 *         password:
 *           type: string
 *           description: Password of user
 *         confirmationPassword:
 *           type: string
 *           description: Confirmation password of user
 *       required:
 *         - email
 *         - password
 *         - confirmationPassword
 */
function putUserRouterComposer(diHash) {
  const {
    handlerFcomposerHash,
    express,
  } = diHash;
  const expressRouter = express.Router();

  const handlerFcomposer = handlerFcomposerHash.putUser;
  expressRouter.put("/user/:id", handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = putUserRouterComposer;
