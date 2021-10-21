/**
 * @openapi
 * /user:
 *   post:
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
function postUserRouterComposer(diHash) {
  const {
    handlerFcomposerHash,
    express,
  } = diHash;
  const expressRouter = express.Router();

  const handlerFcomposer = handlerFcomposerHash.postUser;
  expressRouter.post("/user", handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = postUserRouterComposer;
