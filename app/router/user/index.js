const postUserAuthRouterComposer = require("./postUserAuthRouterComposer");
const postUserRouterComposer = require("./postUserRouterComposer");

function userRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;
  const expressRouter = express.Router();

  expressRouter.use(postUserAuthRouterComposer(diHash));
  expressRouter.use(postUserRouterComposer(diHash));

  return expressRouter;
}

module.exports = userRouterFcomposer;
