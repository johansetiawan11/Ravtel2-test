/**
 * @openapi
 * /user/{UUID}:
 *   get:
 *     description: Retrieve a user record.
 *     parameters:
 *       - in: path
 *         name: UUID
 *         required: true
 *         description: UUID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retrieved user record.
 *     tags:
 *       - user
 */
function getUserRouterComposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
    middlewareFcomposerHash,
  } = diHash;
  const auth = middlewareFcomposerHash.Authentication;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getUser;
  expressRouter.get("/user/:uuid", [auth(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = getUserRouterComposer;
