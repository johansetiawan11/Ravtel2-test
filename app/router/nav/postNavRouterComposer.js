/**
 * @openapi
 * /nav:
 *   post:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Create a new nav record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/postNavPayload'
 *     responses:
 *       200:
 *         description: Created nav record.
 *     tags:
 *       - nav
 *
 * components:
 *   schemas:
 *     postNavPayload:
 *       type: object
 *       properties:
 *         nav:
 *           description: Nav
 *           type: string
 *         date:
 *           description: Date of nav
 *           type: string
 *       required:
 *         - nav
 *         - date
 */
function postNavRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.postNav;
  expressRouter.post("/nav", [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = postNavRouterComposer;
