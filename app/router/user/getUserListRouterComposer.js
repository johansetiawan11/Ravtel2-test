/**
 * @openapi
 * /user:
 *   get:
 *     description: Retrieve a list of user records.
 *     responses:
 *       200:
 *         description: Retrieved list of user records.
 *     tags:
 *       - user
 */
function getUserListRouterComposer(diHash) {
  const {
    handlerFcomposerHash,
    express,
  } = diHash;
  const expressRouter = express.Router();

  const handlerFcomposer = handlerFcomposerHash.getUserList;
  expressRouter.get("/user", handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = getUserListRouterComposer;
