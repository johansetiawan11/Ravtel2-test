/**
 * @openapi
 * /user/auth:
 *   post:
 *     description: Post user login credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/postUserAuthPayload'
 *     responses:
 *       200:
 *         description: Login response.
 *     tags:
 *       - user
 *
 * components:
 *   schemas:
 *     postUserAuthPayload:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email of user
 *         password:
 *           type: string
 *           description: Password of user
 *       required:
 *         - email
 *         - password
 */
function postUserAuthRouterComposer(diHash) {
  const {
    handlerFcomposerHash,
    express,
  } = diHash;
  const expressRouter = express.Router();

  const handlerFcomposer = handlerFcomposerHash.postUserAuth;
  expressRouter.post("/user/auth", handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = postUserAuthRouterComposer;
