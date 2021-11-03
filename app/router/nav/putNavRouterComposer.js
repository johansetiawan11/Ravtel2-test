/**
 * @openapi
 * /nav/{id}:
 *   put:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Update a nav record.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the nav to update.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/putNavPayload'
 *     responses:
 *       200:
 *         description: Updated nav record.
 *     tags:
 *       - nav
 *
 * components:
 *   schemas:
 *     putNavPayload:
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
function putNavRouterComposer(diHash) {
  const {
    authHandlerFcomposerHash,
    express,
    handlerFcomposerHash,
  } = diHash;
  const appOrUserAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.putNav;
  expressRouter.put("/nav/:id", [appOrUserAuthHandlerFcomposer(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = putNavRouterComposer;
