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
 *         description: User login response.
 *     tags:
 *       - user
 *
 * components:
 *   schemas:
 *     postUserAuthPayload:
 *       type: object
 *       properties:
 *         username:
 *           description: Username of user
 *           type: string
 *         password:
 *           description: Password of user
 *           type: string
 *       required:
 *         - username
 *         - password
 */
function postUserAuthRouterComposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
  } = diHash;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.postUserAuth;
  expressRouter.post("/user/auth", handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = postUserAuthRouterComposer;
