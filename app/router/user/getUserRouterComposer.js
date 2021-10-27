/**
 * @openapi
 * /user/{id}:
 *   get:
 *     description: Retrieve a user record.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retrieved user record.
 *     tags:
 *       - user
 */
function getUserRouterComposer(diHash) {
  const {
    handlerFcomposerHash,
    express,
  } = diHash;
  const expressRouter = express.Router();

  const handlerFcomposer = handlerFcomposerHash.getUser;
  expressRouter.get("/user/:id", handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = getUserRouterComposer;
