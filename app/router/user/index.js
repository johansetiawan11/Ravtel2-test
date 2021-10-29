const deleteUserRouterComposer = require("./deleteUserRouterComposer");
const getUserListRouterComposer = require("./getUserListRouterComposer");
const getUserRouterComposer = require("./getUserRouterComposer");
const postUserAuthRouterComposer = require("./postUserAuthRouterComposer");
const postUserRouterComposer = require("./postUserRouterComposer");
const putUserRouterComposer = require("./putUserRouterComposer");

function userRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;
  const expressRouter = express.Router();

  expressRouter.use(deleteUserRouterComposer(diHash));
  expressRouter.use(getUserListRouterComposer(diHash));
  expressRouter.use(getUserRouterComposer(diHash));
  expressRouter.use(postUserAuthRouterComposer(diHash));
  expressRouter.use(postUserRouterComposer(diHash));
  expressRouter.use(putUserRouterComposer(diHash));

  return expressRouter;
}

module.exports = userRouterFcomposer;
